package test;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class GameUtil {
	
	private GameUtil(){}  //工具类将构造器私有化
	
	public static Image getImage(String path)
	{
		BufferedImage  img = null;
		try {
			img = ImageIO.read(new File(path));		//通过文件读取图片信息
		} catch (IOException e) {
			e.printStackTrace();			//异常处理
		}
		
		return img;
	}

}