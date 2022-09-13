$(function () {
	var running = 0,
		h1 = $("h1"),
		h1a5 = $("span", h1).eq(-1),
		what = $("#what"),
		btn = $("#start"),
		list = $("#list"),
		l = list.val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" "),
		cfg = $("#cfgmenu"),
		menu_number = $("#menu_number"),
		book = [
			["早上", "面包 蛋糕 荷包蛋 烧饼 饽饽 油条 馄饨 火腿 面条 小笼包  玉米粥 肉包 山东煎饼 饺子 煎蛋 烧卖 生煎 锅贴 包子 酸奶 苹果 梨 香蕉 皮蛋瘦肉粥 蛋挞 南瓜粥 煎饼 玉米糊 泡面 粥 馒头 燕麦片 水煮蛋 米粉 豆浆 牛奶 花卷 豆腐脑 煎饼果子 小米粥 黑米糕 鸡蛋饼 牛奶布丁 水果沙拉 鸡蛋羹 南瓜馅饼 鸡蛋灌饼 奶香小馒头 汉堡包 披萨 八宝粥 三明治 蛋包饭 豆沙红薯饼 驴肉火烧 粥 粢饭糕 蒸饺 白粥"],
			["中午", "盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 速冻水饺 日本料理 涮羊肉 味千拉面 肯德基 面包 扬州炒饭 自助餐 茶餐厅 海底捞 咖啡 比萨 麦当劳 兰州拉面 沙县小吃 烤鱼 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 竹笋烤肉"],
			["晚上", "盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 速冻水饺 日本料理 涮羊肉 味千拉面 肯德基 面包 扬州炒饭 自助餐 茶餐厅 海底捞 咖啡 比萨 麦当劳 兰州拉面 沙县小吃 烤鱼 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 竹笋烤肉"]
		],
		times = 0,
		timer,
		toast_options = {
			showTop: true,
			timeout: 4000,
			distance: 50
		},
		hour = (new Date).getHours();
	book[1][1] = book[2][1];
	
	//菜单数量
	menu_number.text(l.length);

	btn.val("开始").removeAttr("disabled").click(function () {
		l = list.val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
		if (l.length == 1 && l[0] != "") return alert("→_→ 耍我是吧，一个有什么好选的！");
		if (l.length == 1) return alert("啥也没有，吃西北风去啊？");
		if (!running) {
			times++;
			if (times == 5) {
			Metro.toast.create("<h2>都不想吃那就别吃了!</h2>", null, null, null, toast_options);
				btn.remove();
				cfg.remove();
				return false;
			};
			h1a5.text("？");
			$(this).val("停止");

			timer = setInterval(function () {
				var r = MOFUN.random(l.length),
					food = l[r - 1],
					rTop = MOFUN.random($(document).height()),
					rLeft = MOFUN.random($(document).width() - 50),
					rSize = MOFUN.random(37, 14);
				what.html(food);
				$("<span class='temp'>" + food + "</span>").css({
					"display": "none",
					"top": rTop,
					"left": rLeft,
					"color": "rgba(0,0,0,." + Math.random() + ")",
					"fontSize": rSize + "px",
					"userSelect": "none"
				}).appendTo("body").fadeIn("slow", function () {
					$(this).fadeOut("slow", function () {
						$(this).remove();
					});
				});
			}, 60);

			running = 1;
		} else {
			h1a5.text("！");
			btn.val("不行，换一个");
			clearInterval(timer);
			running = 0;
		};
	});

	//编辑菜单
	cfg.click(function () {
		running ? alert("还在选呢！") : Metro.dialog.open("#popbox")
	});

	$("#ok").click(function (){
		l = list.val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
		menu_number.text(l.length);
	});

	
	//响应空格
	document.onkeydown = function (e) {
		e = e || window.event;
		($("#popbox").css("visibility") == "hidden") ? popbox_status = true : popbox_status = false;
		if ((e.keyCode == 32) && popbox_status) $("#start").trigger("click");
	};
});