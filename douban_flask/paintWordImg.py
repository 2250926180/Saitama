# codeing = utf-8

import jieba                                #分词
from matplotlib import pyplot as ptl        #绘图，数据可视化
from wordcloud import WordCloud             #词云
from PIL import Image                       #图片处理
import numpy as np                          #矩阵运算
import sqlite3

#词云用到的字
conn = sqlite3.connect('movie.db')
cursor = conn.cursor()
sql = 'select introduction from  movie250;'
data = cursor.execute(sql)
text = ""
for item in data:
    if len(item[0])==0:
        continue
    text = text + item[0]
cursor.close()
conn.close()

#切分词汇
cut = jieba.cut(text)
string = ' '.join(cut)
print("获得词云数量：" + str(len(string)))

#加图片，使用矩阵把图片保存到数组
img = Image.open(r'static/images/rick.png')
img_array = np.array(img)

#创建词云对象
# wc = WordCloud(
#     background_color= 'white',
#     mask = img_array,
#     font_path = 'static/MSYHMONO.ttf',
#     stopwords=set(['主演','导演']),
#     max_words=100
# )
wc = WordCloud(
    background_color= 'white',
    mask = img_array,
    font_path = 'static/MSYHMONO.ttf',
    stopwords=set(['了','的','你','我','是','都','人','个']),
    max_words=100
)
#指定词云词汇
wc.generate_from_text(string)

#绘制图片
fig = ptl.figure(1)
ptl.imshow(wc)
ptl.axis('off')          #是否显示坐标轴

#ptl.show()               #显示图片

ptl.savefig('static/infoword.png',dpi=500)

