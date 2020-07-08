package test;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;



public class RoundFrame extends Myframe{
	
	private static final long serialVersionUID = 1L;
	Ball r = new Ball("src\\pic\\round.png",460 ,460);	//实例化彩虹球对象
	Image bg = GameUtil.getImage("src\\pic\\background_black.jpg");		//读取背景图片
	ArrayList<Bullets> bullets = new ArrayList<>();		//存放子弹的数组列表
	
	public static int GAME_FLAG = 0;
	final int GAME_CONTINUE = 0;		//游戏运行状态
	final int GAME_OVER = 1;
	final static double JUDGE_ERROR = 35.35;		//碰撞判定误差
	double START_TIME;		//记录游戏开始时间
	
	public void paint(Graphics g) {    //绘制图像paint方法
		g.drawImage(bg,0,0,Constant.Game_With,Constant.Game_High,null);		//绘制背景
		r.draw(g);		//绘制小球
		PrintfScore(g,   "" + (System.currentTimeMillis()-START_TIME)/1000, 40, 30, 80, Color.red);		//打印实时分数
		for(int i=0;i<bullets.size();i++) {		//打印每个子弹
			bullets.get(i).draw(g);
		}
		
	}
	
	public static void main(String[] args) {  //main函数
		JFrame f = new JFrame("小球躲避子弹");
		f.setVisible(true);
		f.setSize(Constant.Game_With, Constant.Game_High);
		f.setLocation(Constant.Location_X,0);
		JLabel jl1 = new JLabel(new ImageIcon("src\\pic\\play.jpg"));		//添加PLAY按钮到标签
		f.add(jl1);
		jl1.addMouseListener(new MouseAdapter() {		//自定义鼠标监听器

			@Override
			public void mouseClicked(MouseEvent e) {
				if(e.getClickCount()==1) {
					f.setVisible(false);
					new RoundFrame().runGame();
				}
			}
			
		});
		
	}

	
	@Override
	public void runGame() {
		
		START_TIME = System.currentTimeMillis();
		CreateEnemy(bullets, r);		//创建敌人方法(仅运行一次)
		GameRunThread grt = new GameRunThread();  //实例化游戏运行线程
		grt.start();		//游戏运行线程启动
		super.runGame();	//调用父类创建框架	
		addKeyListener(new KeyMonitor());		//添加自定义键盘监听器
	}
	
class GameRunThread extends Thread{  //游戏运行线程(包括如:越界处理，碰撞判定)

	@Override
	public void run() {
		do{		//永真循环使线程不断判定
			try {
				if(GAME_FLAG == 0) {  //若游戏继续
				GAME_FLAG = crashjudge(bullets, r);   //碰转判定将返回值赋值给游戏状态
				DeleteEnemy(bullets);		//子弹越界处理
				sleep(30);			//线程睡眠30ms;
				}
				else {
					PrintfScore(getGraphics(),"GAME  OVER!!!", 80, Constant.Game_With/5, Constant.Game_High/2,Color.red);		//打印游戏结束
					break;  //结束线程循环
				}
					
			}catch(Exception e) {  //异常捕捉
				e.printStackTrace();
			}
		}while(true);
	}
	
}

public void CreateEnemy(ArrayList<Bullets> bullets, Ball r){ //子弹入场
	for(int i=0;i<10;i++) {
	Bullets e = new Bullets();  //新实例化子弹对象
	e.getspeed(r);			//新的子弹对象获取自己的运动方向和速度
	bullets.add(e);			//将新的子弹对象添加到子弹数组列表
	}

}

public void DeleteEnemy(ArrayList<Bullets> bullets) {   //删除子弹，实则是重新设定子弹
	for(int i=0;i<bullets.size();i++) {
		if(bullets.get(i).JudgeBounds()) {
			bullets.get(i).DeleteEnemy(r);
		}
	}
}
	
public double distance(double x1,double y1,double x2,double y2) {   //欧氏距离
	return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}

public int crashjudge(ArrayList<Bullets> bullets, Ball r) { 		//子弹和小球碰撞判定
	double x1 = r.x+JUDGE_ERROR, y1 = r.y+JUDGE_ERROR;  //获取小球当前的位置坐标并处理误差
	for(int i = 0;i<bullets.size();i++) {
		double x2 = bullets.get(i).x+JUDGE_ERROR, y2 = bullets.get(i).y+JUDGE_ERROR;  						//获取每个子弹的位置坐标并处理误差
		if(distance(x1, y1, x2, y2)<26) return GAME_OVER;    //若判定成功返回游戏结束状态
		
	}
	return GAME_CONTINUE;
}


public void PrintfScore(Graphics g ,String s ,int size ,int x ,int y ,Color c) {   //打印方法
	Color color = g.getColor();
	g.setColor(c);
	Font f = new Font("微软雅黑", Font.BOLD, size);  //实例字体样式
	g.setFont(f);  	 //为画笔设置样式
	g.drawString(s, x, y);		//打印s字符串
	g.setColor(color);
}



	class KeyMonitor extends KeyAdapter{  //自定义键盘监听器  按下和松开按键.

		@Override
		public void keyPressed(KeyEvent e) {		//键盘按下监听器
			r.Adddirection(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {		//键盘松开监听器
			r.mindirection(e);
		}
		
	}
}
