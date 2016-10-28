$(function(){
	var pid = getUrlParam("pid");
	var index = getUrlParam("index")||0;
	$.get("json/myinfo.json",function(data){
		console.log(data);
		var str = "";
		var data1 = data[index].result;
		for(var i = 0;i<data1.length;i++){
			if(pid==data1[i].id){
				str +="<div class='info-nav'>"+
		"<a href='index.html'>首页</a><i>></i>"+
		"<a href='#'>"+data1[i].info_nav1+"</a><i>></i>"+
		"<a href='#'>"+data1[i].info_nav2+"</a><i>></i>"+
		"<a href='#'>"+data1[i].info_nav3+"</a>"+
		"</div>"+
		"<div class='info-left-img' id='info-left-img'>"+
			"<img src='images/image/"+data1[i].imgres+"' alt='' />"+
			"<div class='info-img-glass'></div>"+
		"</div>"+
		"<div class='info-img-pop' id='info-img-pop'>"+
			"<img src='images/image/"+data1[i].imgres+"'  alt='' />"+
		"</div>"+
		"<div class='info-img-main'>"+
			"<div class='prev'></div>"+
			"<div class='center' id='center'>"+
				"<span><img src='images/xq/"+data1[i].img_src1+"' alt='' /></span>"+
				"<span><img src='images/xq/"+data1[i].img_src2+"' alt='' /></span>"+
				"<span><img src='images/xq/"+data1[i].img_src3+"' alt='' /></span>"+
			"</div>"+
			"<div class='next'></div>"+
		"</div>"+
		"<div class='newHome-info-title'>"+
			"<div class='info-title'>"+
				"<h1 class='m_g'>"+data1[i].title+"</h1>"+
			"</div>"+
			"<div class='info-content'>"+
				"<p>品 牌："+data1[i].info_brand+"   <span>货号： "+data1[i].info_no+"</span></p>"+
				"<div class='sc-price'>市场价："+
					"<del> "+data1[i].price+"</del>	"+
				"</div>"+
				"<div class='xz-price'>校妆价："+
					"<span id='xz'>￥</span>"+
					"<span> "+data1[i].priced+"</span>"+
				"</div>"+
				"<div class='info-jf'>所得积分：9</div>"+
				"<div class='info-sale'>已售出："+
					"<span>231398</span>件      浏览人数："+
					"<span>28530</span>"+
				"</div>"+
				"<div class='info-promot'>"+
					"<span>促销信息：</span>"+
					"<i>"+data1[i].info_mess+"</i>"+
				"</div>"+
			"</div>"+
			"<div class='info-buy'>"+
					"<div class='buy-num'><p>购买数量：</p>"+
						"<div class='change-buy-num'>"+
							"<div class='sub-num'>"+
								"<img src='images/xq/sub_num1.jpg'>"+
							"</div>"+
							"<div class='show-num'>"+
								"<input value='1' name='buy-num' class='buy-num-show' type='text'>"+
							"</div>"+
							"<div class='add-num'>"+
								"<img src='images/xq/add_num.jpg'>"+
							"</div>"+
						"</div>"+
					"</div>"+
					"<a href='javascript:void(0)' onclick='addCats(this)' class='buy_btn js-btn'  data-id='"+(JSON.stringify(data1[i]))+"' id='goods_btn'>加入购物车</a>"+
				"</div>"+
		"</div>"
			}
		}
		$(".newHome-info-left").html(str);
		
		//	放大镜开始
	//	鼠标移入
		$(".info-left-img").mouseover(function(){
			$(".info-img-glass").show();
			$(".info-img-pop").show();
		})
	//	鼠标滑动
		$(".info-left-img").mousemove(function(e){
			var e = event||window.event;
			var glassLeft = e.pageX -$(this).offset().left-$(".info-img-glass").outerWidth()/2;
			var glassTop = e.pageY-$(this).offset().top-$(".info-img-glass").outerHeight()/2;
		
			if(glassLeft<=0){
				glassLeft = 0;
			}
			if(glassTop<=0){
				glassTop = 0;
			}
			if(glassLeft>=$(this).outerWidth()-$(".info-img-glass").outerWidth()){
				glassLeft = $(this).outerWidth()-$(".info-img-glass").outerWidth();
			}
			if(glassTop>=$(this).outerHeight()-$(".info-img-glass").outerHeight()){
				glassTop = $(this).outerHeight()-$(".info-img-glass").outerHeight()
			}
			
			$(".info-img-glass").css({
				"left":glassLeft,
				"top":glassTop
			})
			
			var percentX = glassLeft/($(this).outerWidth()-$(".info-img-glass").outerWidth());
			var percentY = glassTop/($(this).outerHeight(".info-img-glass").outerHeight());
			
			var imgLeft = percentX*($(".info-img-pop").outerWidth()-$(".info-img-pop img").outerWidth());
			var imgTop = percentY*($(".info-img-pop").outerHeight()-$(".info-img-pop img").outerHeight());
			
			$(".info-img-pop img").css({
					"left":imgLeft,
					"top":imgTop
				})
		})		
		$(".info-left-img").mouseout(function(){
			$(".info-img-glass").hide();
			$(".info-img-pop").hide();
		})
		
	//放大镜结束	
//	购买数量开始
		var num = $(".show-num").text();
		$(".sub-num").click(function(){
			num--;
			if(num<1){
				num = 1;
			}
			$(".show-num").text(num)
			
		})
		$(".add-num").click(function(){
			num++;
			$(".show-num").text(num)
		})	
//	购买数量结束
		$("#center span").find("img").hover(function(){
			getImg(this);
			
		})

	})
	
//详情部分下面
	$(document).scroll(function(){
		var scroll = document.documentElement.scrollTop||document.body.scrollTop;
		if(scroll>="690"){
			$(".myinfo-bottom-nav").css(
				{"position":"fixed","top":0},
				{"margin":"auto"}
				)
			$(".myinfo-bottom-main").css(
				{"position":"fixed","top":48},
				{"margin":"auto"}
				)
		}
		if(scroll<="690")
		{
			$(".myinfo-bottom-nav").css({"position":"relative"})
			$(".myinfo-bottom-main").css({"position":"relative"})
		}
	})
		
	var $li1 = $(".myinfo-bottom-nav .nav-list li")
	var $li2 = $(".myinfo-bottom-main li")
		$li1.click(function(){
			var index = $li1.index(this);
			$li2.eq(index).show().siblings().hide();
		})
		
	$("#btn-say").click(function(){
		$("#say").show();
		$(".close-say").click(function(){
			$("#say").hide();
		})
		$("#subsay").click(function(){
			var txt = $("#txt").val();
			var d = new Date();
			var d1 = d.toLocaleDateString()+"&nbsp;";
			var d2 = d.toLocaleTimeString();
			var time = d1 + d2;
			var str = '<dl>'+
					'<dt>'+
						'<img src="images/xq/bjin_paipai.jpg" alt="" />'+
					'</dt>'+
					'<dd class="comment_t">'+
							'<span>946***78</span>白金会员'+            
		                '<div class="comment_star">'+
		                    '<img src="images/xq/5.0.png" alt="" width="84" height="16">'+
		                '</div>'+
		               '<div class="comment_time">'+time+'</div>'+
           			 '</dd>'+
					'<dd class="comment_con">'+
		                '<div class="comment_text" style="height:auto;line-height:30px">'+
		                    '<p>'+txt+'</p>'+
		                '</div>'+
            		'</dd>'+
				'</dl>'
			$(".kbbg-list").append(str);
			$("#txt").val(null)
		})
	})
	
})
 //获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function getImg(obj){
	var path=$(obj).attr("src");
	$("#info-left-img img").attr("src",path);
	$("#info-img-pop img").attr("src",path);
	}