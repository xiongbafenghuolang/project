/*+++++++++++++++header+++++++++++++++++++++++++++++*/
jQuery(document).ready(function($) {
	//	显示用户名
	if($.cookie().clickname)
	{
		$(".list li:first-child").html("欢迎"+$.cookie().clickname+"成功登录");
	}
	// 头部导航
	$("#myxz").mouseover(function(event) {
		$("#list1").show();
	});
	$("#myxz").mouseout(function(event) {
		$("#list1").hide();
	});
	$("#service").mouseover(function(event) {
		$("#list2").show();
	});
	$("#service").mouseout(function(event) {
		$("#list2").hide();
	});
	// 购物车
	$("#newHome-shopCar a").mouseenter(function(event) {
		show($(".MyshopCar"))
	});
	$("#newHome-shopCar a").mouseleave(function(event) {
		hide($(".MyshopCar"))
	});
	function show(obj){
		obj.show();
	}
	function hide(obj){
		obj.hide();
	}
//	搜索
	$(".searchbtss").click(function(){
//		getSearch();
		var str = $(".searchin").val();
		window.location.href="page.html?keywords="+str;
	})
	//轮播
	$(".banner").mouseenter(function(){

	  $(".Previous").animate({left:"5px"});
	  $(".Next").animate({right:"5px"});

	});
	$(".banner").mouseleave(function(){

	  $(".Previous").animate({left:"-150px"});
	  $(".Next").animate({right:"-150px"});

	});
	//右下角广告
	$("#close").click(function(){
		$(".footerNotice").hide();
	});
	//	精选活动——品牌特卖开始
		$(".barnd_img").mouseover(function(e){
			$(this).next(".brand_detail").animate({"height":"200px"},500);
		})
		$(".barnd_img").mouseout(function(e){
			$(this).next(".brand_detail").animate({"height":"0"},500)
		})
	
	//右侧广告
	$(".newHome-toolBar-gototop").click(function(){
		document.documentElement.scrollTop||document.body.scrollTop;
		$("html,body").scrollTop(0);
	})
	
//	详情页第一部分
	$.get("json/info.json",function(data){
		var data1 = data[0].result;
		var str1 = "";
		for(var i = 0;i<data1.length;i++){
			str1 +="<li>"+
					"<div class='sale_img'>"+
						"<a class='sale_imgs' href='myinfo.html?pid="+data1[i].id+"&index=0'>"+
							"<img src='images/image/"+data1[i].imgres+"' alt=''>"+
						"</a>"+
						"<div class='time'>"+
							"<div class='time_bg'></div>"+
							"<p>"+
								"<i></i>"+
								"<b></b>"+
							"</p>"+
						"</div>"+
						"<div class='sale_green'>真心便宜</div>"+
					"</div>"+
					"<h4>"+
						"<a href='myinfo.html?pid="+data1[i].id+"&index=0'>"+data1[i].title+"</a>"+
					"</h4>"+
					"<div class='sale_price'>"+
						"<span class='priced'>"+
							"<dfn>¥</dfn>"+data1[i].priced+""+
						"</span>"+
						"<del class='price'>"+
							"<dfn>¥</dfn>"+data1[i].price+""+
						"</del>"+
						"<span class='sale_num'>"+
							"<strong>"+data1[i].sale_num+"</strong>人已购买"+
						"</span>"+
						"<a class='sale_buys js-btn' onclick='addCats(this)' data-id='"+(JSON.stringify(data1[i]))+"' href='javascript:void(0)'>立即抢购</a>"+
					"</div>"+
				"</li>"
		}
		$(".content-one-left ul").html(str1);
//		将数据存取到cookie中
		
		var total = parseInt(localStorage.getItem("total")||0);
		$(".new-cart-number").html(total);
		if(total>0){
			$("#go_cats").attr("href","shopcats.html");
		}
		
//			console.log($.cookie());
		//设置倒计时开始
		var time = "";
		// 获取指定时间【后台输入】
		var timeStr = "2016/11/20 18:58:59";
		var futureTime = new Date(timeStr);

		// setInterval(fn , time/ms) ：间隔time毫秒，执行fn函数
		setInterval(timing, 1);

		function timing() {
			// 获取当前时间
			var currentTime = new Date();
			// 计算时间差——毫秒// getTime()：获取一个时间的毫秒数【1970/1/1 00:00:00】
			var distanceTime = futureTime.getTime() - currentTime.getTime();

			// 计算时间差[天 / 小时 / 分钟 / 秒]
			var day = Math.floor(distanceTime/1000/60/60/24);

			var hour = Math.floor(distanceTime/1000/60/60 % 24);

			var min = Math.floor(distanceTime/1000/60 % 60);

			var seconds = Math.floor(distanceTime/1000 % 60);

			// 将时间拼接成字符串，添加到
			$(".time b").html("仅剩：" + day + "天" + hour +"时" + min + "分" + seconds + "秒")
		}
		//设置倒计时结束
		
		var data2 = data[1].result;
		var str2 = "";
		for(var i = 0;i<data2.length;i++){
			str2 +="<li>"+
				"<div class='hot_img'>"+
					"<a href='myinfo.html?pid="+data2[i].id+"&index=1'><img src='images/image/"+data2[i].imgres+"' alt='' /></a>"+
					"<div class='"+getLableClass(data2[i].status)+"'>"+data2[i].sale+"</div>"+
					"<h3 m_g>"+
						"<a href='myinfo.html?pid="+data2[i].id+"&index=1'>"+data2[i].title+"</a>"+
					"</h3>"+
					"<p>"+data2[i].content+""+
					"<div class='sale_price'>"+
						"<span class='sale_num'>"+
							"<strong>"+data2[i].sale_num+"</strong>人已购买"+
						"</span>"+
						"<span class='priced'>"+
							"<dfn>¥</dfn>"+data2[i].priced+""+
						"</span>"+
						"<del class='price'>"+
							"<dfn>¥</dfn>"+data2[i].price+""+
						"</del>"+
						"<span class='discount'>"+data2[i].discount+"</span>"+
					"</div>"+
					"<a href='javascript:void(0)' onclick='addCats(this)' class='sale_buy js-btn' data-id='"+(JSON.stringify(data2[i]))+"'>立即抢购</a>"+
				"</div>"+
			"</li>"
		}
		$(".Hot").html(str2);
	})

	
});


function addCats(obj){
	var cats = localStorage.getItem("cats");
			if(cats==null||cats=="null"||cats==undefined){
				cats = new Array();
			}else{
				cats = $.parseJSON(cats);
			}
//			console.log(cats);
			
			total = parseInt(localStorage.getItem("total")||0);
			
			
			
			var prod = $(obj).attr("data-id");
//			console.log(prod);
			if($.inArray(prod, cats)<0){
				cats.push(prod);
			}
			prod = JSON.parse(prod);
			var prodId = prod.id;
			var num = localStorage.getItem("id"+prodId+"num")||0;
			
//			$.cookie("cats",JSON.stringify(cats),{expires:7,path:"/"});
//			$.cookie("id"+prodId+"num",++num,{expires:7,path:"/"});
			localStorage.setItem("cats",JSON.stringify(cats));
			localStorage.setItem("id"+prodId+"num",++num);
			
			total = total+1;
//			$.cookie("total",total,{expires:7,path:"/"});
			localStorage.setItem("total",total)
			$(".new-cart-number").html(total);
//			alert("在购物车等你哦！");
			showDialog(prod.title,prod.priced);
			if(total>0){
			$("#go_cats").attr("href","shopcats.html");
			}
//			console.log(cats);
}

function getLableClass(status){
	switch (status){
		case 1:
			return 'sale_reds';
		case 2:
			return 'sale_greens';
		case 3:
			return 'sale_yellows';
		default:
			return 'sale_greens';
	}
}
//弹窗显示
function showDialog(title,price){
	$("#cat_title").html("名称："+title);
	$("#cat_price").html(price);
	$("#dialog").show();
}
function hideDialog(){
	$("#dialog").hide();
}


