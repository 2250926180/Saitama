# codeing =utf-8
import requests
import re


exceptspace=re.compile(r'[\s]+')
allvideo=re.compile(r'<span__windr-class=".+?>(.+?)</span>')
vurl=re.compile(r'<ahref="(.+?)"')

url='https://v.qq.com/x/cover/mzc00200c6aodyr.html'

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    }

reponse = requests.get(url)
html=re.sub(exceptspace,'',reponse.text)

v=re.findall(allvideo,html)
video=[]
for i in v:
    if 'tag_mini_trailerlite.png' in i:
        continue
    video.append("https://www.kiwi8.top/mov/s/?url=https://v.qq.com"+re.findall(vurl,i)[0])

for i in range(len(video)):
    print("<li><a href="+video[i]+">"+str(i+1)+"</a></li>")

