package test;

import java.awt.Color;
import java.awt.Graphics;
import java.util.Random;



public class Bullets {
	Random rand = new Random();			//随机数对象
	double diameter = 20;				//子弹大小
	double x,y;							//子弹位置坐标
	private double degree = rand.nextInt(10)+50;		//子弹速度程度(随机速度)
	double speedx,speedy;				//子弹在x,y轴上的分速度
	
	
	public Bullets(){			//默认构造方法，设置第一波 子弹从上边界射入
			this.x=rand.nextInt(Constant.Game_With+1);
			this.y=0;
	}
	public void draw(Graphics g) {   //绘制对象
		Color c = g.getColor();
		g.setColor(Color.pink);
		g.fillRect((int)x,(int)y,(int) diameter, (int)diameter);
		
		this.x+=this.speedx;
		this.y+=this.speedy;
		g.setColor(c);
		}
	
	public void getspeed(Ball r) {  //获取子弹轨迹的方程参数
		
		this.speedx = (r.x-this.x)/degree;
		this.speedy = (r.y-this.y)/degree;
	}
	
	public void DeleteEnemy(Ball r) {   //重新设定子弹属性
		switch(rand.nextInt(3)) {    //重新随机从四个边界射入子弹
		case 0:
			this.x=rand.nextInt(Constant.Game_With+1);
			this.y=0;
			break;
		case 1:
			this.x = Constant.Game_With;
			this.y  = rand.nextInt(Constant.Game_High+1);
			break;
		case 2:
			this.x = rand.nextInt(Constant.Game_With+1);
			this.y = Constant.Game_High;
			break;
		case 3:
			this.x = 0;
			this.y = rand.nextInt(Constant.Game_High+1);
			break;
		}
		
		getspeed(r);   //重新获取子弹的分速度
		
	}
	
	
	public boolean JudgeBounds() {  //判断是否出界
		if(this.x<0||this.x>Constant.Game_With||this.y<0||this.y>Constant.Game_High) return true;
		else return false;
	}
	
}
