$(function(){
	var onOff = true;
	$(".mic-nav-down-show").click(function(){
		if(onOff){
			$(this).next("#mic-nav-down-content").show();
			onOff = false;
		}else{	
			$(this).next("#mic-nav-down-content").hide();
			onOff = true;
		}
	})
//	轮播部分	
	$.get("js/scrollImg.json",function(data){
		$.each(data,function(index,value){//value指的是data的值
			$("<li><a href='' style='background:url("+value+") no-repeat center center'></a></li>").appendTo($("#scroll_box ul"));
			$("<a>").appendTo($(".slider-nav"));
		})
		var $ul = $("#scroll_box ul");
		$("#scroll_box li:first-child").clone().appendTo($("#scroll_box ul"));
		var $li = $("#scroll_box li");
		var len = $li.length;//li的长度
		var perWidth = $li.outerWidth();//li的宽度 outerWidth指的是width+padding+border
		$ul.css("width",perWidth*len);//ul的宽度
		$li.css("width",perWidth);//li宽度
		$(".slider-nav a").css("width",$(".slider-nav").outerWidth()/(len-1)-1);
		//a的宽度，len-1指的是总共6张图片，显示5个a，(len-1)-1指的是减去margin值
		$(".slider-nav a").eq(0).addClass("cur");//给第0个a添加一个样式
		var i = 0;
		var timer = setInterval(move,3000);
		function move(){
			i++;
			
			if(i==-1){
			i=len-2;
			$ul.css("margin-left",-perWidth*(len-1));
			//整个ul向左平移
				}
			if(i==len-1){
				$(".slider-nav a").eq(0).addClass("cur").siblings().removeClass();
				//当图片变化到下一张时给对应的a添加样式，并且移除前一个a的样式	
			}
			if(i == len){
				i = 1;

				$("#scroll_box ul").css("margin-left",0);
				//当移动到最后一张图片时,将margin值清除
			}
			
			$ul.stop().animate({"margin-left":-perWidth*i});
			//停止所有在指定元素上正在运行的动画
			$(".slider-nav a").eq(i).addClass("cur").siblings().removeClass();
			//给第i个a添加样式，并且同辈元素a移除样式
		}
		//点击左边按钮
		$("#prev").click(function(){
			clearInterval(timer);
			move();
			timer = setInterval(move,3000);
		});
		//点击右边按钮
		$("#next").click(function(){
			clearInterval(timer);
			i = i - 2;
			move();
			timer = setInterval(move,3000);
		})
		//鼠标划伤a时的效果
		$(".slider-nav a").hover(function(){
			clearInterval(timer);
			i = $(this).index()-1;
			move()
		},function(){
			timer = setInterval(move,3000);
		})
		$("#scroll_box").mouseover(function(){
			$("#prev").css({"display":"block"})
			$("#next").css({"display":"block"})
		})
		$("#scroll_box").mouseout(function(){
			$("#prev").css({"display":"none"})
			$("#next").css({"display":"none"})
		})
	})
	
	
})
