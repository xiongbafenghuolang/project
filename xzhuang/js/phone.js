$.get("json/phone.json", function(data) {
	
	$.each(data, function(index, value) { //value指的是data的值
		
		$("<li style='background:url(" + value + ")no-repeat center center'></li>").appendTo($(".phone-main ul"));
		$("<a>").appendTo($(".sliderbar"));
		
	})
	
	var $ul = $(".phone-main ul");
	
	$(".phone-main li:first-child").clone().appendTo($(".phone-main ul"));
	
	var $li = $(".phone-main li");
	var len = $li.length;
	var perHeight = $li.outerHeight();
	
	$ul.css("height", perHeight * len); 
	$li.css("height", perHeight); 
	$(".sliderbar a").css("height", $(".sliderbar").outerHeight() / (len - 1)-25);

	$(".sliderbar a").eq(0).addClass("cur"); 
	var i = 0;

	function move() {
		i++;

		if(i == -1) {
			i = len - 2;
			$ul.css("margin-top", -perHeight * (len - 1));
			
		}
		if(i == len - 1) {
			$(".sliderbar a").eq(0).addClass("cur").siblings().removeClass();
			//当图片变化到下一张时给对应的a添加样式，并且移除前一个a的样式	
		}
		if(i == len) {
			i = 1;

			$(".phone-main ul").css("margin-top", 0);
			//当移动到最后一张图片时,将margin值清除
		}

		$ul.stop().animate({
			"margin-top": -perHeight * i
		});
		//停止所有在指定元素上正在运行的动画
		$(".sliderbar a").eq(i).addClass("cur").siblings().removeClass();
		//给第i个a添加样式，并且同辈元素a移除样式
	}
	$(".sliderbar a").click(function(){
		i = $(this).index() - 1;
		move();
	})
})