package test;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.KeyEvent;

public class Ball {
	double x ,y;		//小球坐标
	int diameter=50;	//小球直径
	Image img;			//用于存放小球图片
	boolean left,down,right,up;		//四个方向的状态配合键盘监听
	int speed = 5;		//小球移动速度
	
	public Ball() { //默认无参构造方法
	}
	public Ball(String imgpath, int x,int y){		//含参构造方法，传入小球图片地址字符串和小球的初始打印坐标
		this.img = GameUtil.getImage(imgpath);
		this.x = x;
		this.y = y;
	}
	
	public void draw(Graphics g) {   //小球的绘制函数
		g.drawImage(img,(int)x ,(int)y, 50, 50, null);
		move();    //小球根据按键移动位置
	}
	public void Adddirection(KeyEvent e){		//按下键盘后改变小球方向状态
		switch (e.getKeyCode()) {
		case KeyEvent.VK_LEFT: 
			left = true;
			break;
		case KeyEvent.VK_UP:  
			up  = true;
			break;
		case KeyEvent.VK_RIGHT:  
			right = true;
			break;
		case KeyEvent.VK_DOWN:  
			down = true;
			break;
		default:
			break;
		}
	}
	
	public void mindirection(KeyEvent e){		//键盘松开后改变小球方向状态
		switch (e.getKeyCode()) {
		case 37:  
			left = false;
			break;
		case 38:  
			up  = false;
			break;
		case 39:  
			right = false;
			break;
		case 40:  
			down = false;
			break;
		default:
			break;
		}
	}
	
	public void move(){  		//小球结合方向的状态进行位置移动
		if(left && x>10 ) 
			x -= speed;
		if(right && x<Constant.Game_With-diameter) 
			x += speed;
		if(up && y>30) 
			y -= speed;
		if(down && y<Constant.Game_High-diameter) 
			y += speed;
	}

}
