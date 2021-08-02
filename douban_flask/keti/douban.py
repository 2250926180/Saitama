# coiding=utf-8

import bs4
import re
import urllib.request, urllib.error
import xlwt
import sqlite3

#正则表达式匹配
findLink = re.compile(r'<a href="(.*?)">')
findImage = re.compile(r'src="(.*?)" width="100"/>')
findTitle = re.compile(r'<span class="title">(.*?)</span>', re.S)
findRating = re.compile(r'<span class="rating_num" property="v:average">(.*?)</span>')
findJudge = re.compile(r'<span>(\d*)人评价</span>')
findInq = re.compile(r'<span class="inq">(.*?)</span>')
findDire = re.compile(r'<p class="">(.*?)</p>', re.S)


#主函数
def main():
    baseurl = "https://movie.douban.com/top250?start="   #豆瓣电影榜单原始链接
    # savepath = "豆瓣电影TOP250.xls"
    datalist = getData(baseurl)     #调用获取网页数据函数并返回结果集

    # saveData(datalist, savepath)

    dbpath = "movie.db"             #数据库文件路径
    # initDB(dbpath)  #创建数据库
    saveData2DB(datalist,dbpath)    #将爬取数据存储到数据库


def getData(baseurl):
    datalist = []
    for i in range(0, 10):
        url = baseurl + str(i * 25)
        html = askURl(url)          #批量访问榜单页面

        soup = bs4.BeautifulSoup(html, "html.parser")
        for item in soup.findAll('div', class_="item"):
            item = str(item)
            data = []

            link = re.findall(findLink, item)[0]  # 电影链接
            data.append(link)

            title = re.findall(findTitle, item)  # 电影标题
            ctitle = title[0]
            data.append(ctitle)
            if len(title) == 2:
                otitle = title[1].replace('\xa0/\xa0', '')
                data.append(otitle)
            else:
                data.append('')

            image = re.findall(findImage, item)[0]  # 电影海报
            data.append(image)

            rating = re.findall(findRating, item)[0]  # 电影评分
            data.append(rating)

            judge = re.findall(findJudge, item)[0]  # 电影评价人数
            data.append(judge)

            inq = re.findall(findInq, item)  # 电影简介
            if(len(inq)>0):
                inq=inq[0]
                inq = re.sub('。| ', '', inq)
            else:
                inq=""
            data.append(inq)

            dire = re.findall(findDire, item)[0]  # 电影信息
            dire = re.sub(r"\\xa0|\\n|...<br/>| |(\s+)?", "", dire)
            data.append(dire)
            datalist.append(data)
    return datalist


def askURl(url):
    header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    }       #请求中的配置，否则将被网页识别为爬虫
    request = urllib.request.Request(url, headers=header)       #发送请求
    html = ""
    try:
        response = urllib.request.urlopen(request)
        html = response.read().decode("utf-8")      #得到网页的原始数据
        # print(html)
    except urllib.error.URLError as e:
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)
    return html


def saveData(datalist, savepath):
    print("开始保存...")
    movie = xlwt.Workbook(encoding="utf-8", style_compression=0)  # style_compression:表示是否压缩，不常用。
    sheet = movie.add_sheet("豆瓣电影TOP250",cell_overwrite_ok=True)
    col = ("电影链接", "电影中文名","电影外文名", "电影海报", "电影评分", "电影评价人数", "电影简介", "电影信息")
    for i in range(0, len(col)):
        sheet.write(0, i, col[i])
    for i in range(0, len(datalist)):
        print("第%d条记录" % (i + 1))
        data = datalist[i]
        for j in range(0, len(data)):
            sheet.write(i + 1, j, data[j])
    movie.save(savepath)
    print("保存完成！")

#把结果集保存到数据库
def saveData2DB(datalist,dbpath):
    conn = sqlite3.connect(dbpath)
    cursor = conn.cursor()
    for data in datalist:
        for i in range(len(data)):
            if i == 4 or i==5:
                continue
            data[i]='"'+data[i]+'"'
        sql = '''
            INSERT into movie250(
            info_link,cname,oname,post_link,score,rated,introduction,dire_info)
            VALUES(%s)
        '''%",".join(data)
        cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()
#初始化数据库
def initDB(dbpath):
    sql = '''
    create table movie250(
        id integer primary key autoincrement,
        info_link text,
        cname varchar,
        oname varchar,
        post_link text,
        score numeric,
        rated numeric,
        introduction text,
        dire_info text
    )
    '''

    conn = sqlite3.connect(dbpath)
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()

#主程序入口
if __name__ == '__main__':
    main()
