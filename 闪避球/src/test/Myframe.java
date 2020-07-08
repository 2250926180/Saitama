package test;

import java.awt.Frame;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Myframe extends Frame{
	private static final long serialVersionUID = 1L;

	public void runGame() {  //设置框架方法
		setTitle("小球躲避子弹");
		setSize(Constant.Game_With,Constant.Game_High);
		setLocation(Constant.Location_X,Constant.Location_Y);
		setVisible(true);
		setResizable(false);
		new paintThread().start();
		addWindowListener(new WindowAdapter() {  //程序窗口关闭监视
			@Override
			public void windowClosing(WindowEvent e) {
				System.exit(0);				
			}
		});	
	}
	
private Image iBuffer;   		//双缓存技术后台图像
private Graphics gBuffer;		//双缓存技术后台图像的画笔

	@Override
public void update(Graphics g) { //双缓存将后台图像呈现到前台画面
		if(iBuffer == null) {   //如果后台图像为空
			iBuffer = createImage(Constant.Game_With, Constant.Game_High);  //后台图层获取前台图层的大小
			gBuffer = iBuffer.getGraphics();								//设置好后台画笔
		}
		gBuffer.setColor(getBackground());
		gBuffer.fillRect(0, 0, Constant.Game_With,Constant.Game_High);      //先覆盖后台原来的图层
		paint(gBuffer);														//将下一幅画面绘制到后台图层
		g.drawImage(iBuffer,0,0,this);										
}



	class paintThread extends Thread{  //绘图线程
		public void run() {
			while(true) {
				repaint();
				if(RoundFrame.GAME_FLAG == 1) break;//游戏结束，结束线程循环
				try {
					Thread.sleep(30);
				}catch(InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}
}