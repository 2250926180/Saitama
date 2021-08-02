from flask import Flask,render_template
import sqlite3
import json

app = Flask(__name__)


@app.route('/')
def index():
    datalist = []
    sql = "select count(*) as num,sum(rated) as peopel,200 as word_num,'Braindance' as gro from movie250;"
    conn = sqlite3.connect('movie.db')
    cursor = conn.cursor()
    data = cursor.execute(sql)
    for item in data:
        for i in item:
            datalist.append(i)
    return  render_template("index.html",data = datalist)

@app.route('/index')
def Toindex():
    return index()

@app.route('/movie')
def movie():
    datalist = []
    conn = sqlite3.connect("movie.db")
    cursor = conn.cursor()
    sql = "select * from movie250"
    data = cursor.execute(sql)
    for item in data:
        datalist.append(item)
    cursor.close()
    conn.close()
    return render_template('movie.html',movies = datalist)

@app.route('/score')
def score():
    score = [] #评分
    num = []  #评分的电影数量
    conn = sqlite3.connect('movie.db')
    cursor = conn.cursor()
    sql = 'select score , count(score) from movie250 group by score'
    datalist = cursor.execute(sql)
    for data in datalist:
        score.append(data[0])
        num.append(data[1])
    return render_template('score.html',score=score,num=num)

@app.route('/word')
def word():
    return render_template('word.html')


@app.route('/group')
def group():
    return render_template('group.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000,debug=False)
