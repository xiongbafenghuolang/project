$(document).ready(function(){
//	返回顶部
	$(".backToTop").click(function(){
		document.documentElement.scrollTop||document.body.scrollTop;
		$("html,body").scrollTop(0);
	})
//购物车
	refreshCats();
})

function refreshCats(){
//	var totalPrice=0;
	$("#cast_items").empty();
//	var cats = $.cookie("cats");
	var cats = localStorage.getItem("cats");
	if(cats!=null&&cats!="null"&&cats!=undefined&&cats!="[]"){
		
		cats = $.parseJSON(cats);
		$.each(cats,function(index,shop){
			var shop = JSON.parse(shop);
//			var num = $.cookie("id"+shop.id+"num");
			var num = localStorage.getItem("id"+shop.id+"num")
			var item = '<tr class="carts-center" id="">'+
						'<td align="left">'+
							'<a href="" class="carts-img">'+
								'<img src="images/image/'+shop.imgres+'" alt="" />'+
							'</a>'+
							'<a href="" class="carts-tit">'+
								shop.title+
							'</a>'+
						'</td>'+
						'<td>￥'+formatPrice(shop.priced)+'</td>'+
						'<td>0</td>'+
						'<td>'+
							'<span class="carts-subnum" onclick="numChange(this,\''+shop.id+'\',-1)">-</span>'+
							'<input class="carts-shownum" type="tel" onchange="numChange(this,\''+shop.id+'\',0)" name="" id="" value="'+num+'" />'+
							'<span class="carts-addnum" onclick="numChange(this,\''+shop.id+'\',1)">+</span>'+
						'</td>'+
						'<td>68</td>'+
						'<td>￥<span class="price_item_css">'+formatPrice(parseFloat(shop.priced)*num)+'<span></td>'+
						'<td class="carts-handle">'+
							'<a href="javascript:void(0)" onclick="deleteItem(this)" class="deleteCart" data=\''+JSON.stringify(shop)+'\'>删除</a>'+
						'</td>'+
					'</tr>';
			$("#cast_items").append(item);
//			totalPrice+=(parseFloat(shop.priced)*num);
			console.log(shop);
			console.log(num);
		})
		var total="";
		total+='<tr class="carts-count">'+
						'<td colspan="7">'+
						'	<span class="carts-tub0 carts-tub1"></span>'+
						'	<a href="javascript:void(0)" class="cleancards">清空购物车</a>'+
						'	<ul id="carts-Total">'+
								'<li>商品数量总计：<span id="total_count">'+($.cookie("total"))+'</span>件</li>'+
								'<li>赠送积分总计：68分</li>'+
								'<li>商品总额：</li>'+
								'<li class="carts-prices"></li>'+
							'</ul>'+
						'</td>'+
					'</tr>';
		$("#cast_items").append(total);	
		totalPrice();
//		var totalCount = parseInt($.cookie("total"));
		var totalCount = parseInt(localStorage.getItem("total"));
		if(totalCount>=0){
			$("#go_cats").html(totalCount);
			$("#go_cats").attr("href","shopcats.html");
		}
		$("#cats_empty").hide();
		$("#cats").show();
	}else{
		$("#cats_empty").show();
		$("#cats").hide();
	}
	
	
//	清空购物车
	$(".cleancards").click(function(){
		if(confirm("确定要清空购物车吗？")){
//			clearCookie();
			localStorage.clear();
		}
	
	})
}


function deleteItem(obj){
		var data = $(obj).attr("data");
		var item = JSON.parse(data);
//		var cats = $.cookie("cats");
		var cats = localStorage.getItem("cats")
		if(cats!=null&&cats!="null"&&cats!=undefined){
		cats = $.parseJSON(cats);
		var i = $.inArray(data,cats);
		console.log(i);
		if(i>=0){
			cats.splice(i,1);
//		$.cookie("cats",JSON.stringify(cats),{expires:7,path:"/"});
		localStorage.setItem("cats",JSON.stringify(cats));
		
//		var num = parseInt($.cookie("id"+item.id+"num"));
		var num = parseInt(localStorage.getItem("id"+item.id+"num"));
//		$.cookie("id"+item.id+"num",0,{expires:7,path:"/"});
		
		var total = parseInt($.cookie("total"));
		var total = parseInt(localStorage.getItem("total"));
		total = (total-num>0?(total-num):0);
		
//		$.cookie("total",total,{expires:7,path:"/"});
		
		localStorage.setItem("total",total);
		if(total>=0){
			$("#go_cats").html(total);
			$("#go_cats").attr("href","shopcats.html");
			}
		}
		refreshCats();
		}
}


function clearCookie(){
//	var cats = $.cookie("cats");
	var cats = localStorage.getItem("cats");
	if(cats!=null&&cats!=undefined&&cats!="[]"){
	cats = $.parseJSON(cats);
	for (var i = 0;i<cats.length;i++) {
		var item = JSON.parse(cats[i]);
//		$.cookie("id"+item.id+"num",0,{expires:7,path:"/"});
		localStorage.setItem("id"+item.id+"num",0);	
	}
//	$.cookie("cats",null,{expires:7,path:"/"});
	localStorage.setItem("cats",null);
	
//	$.cookie("total",0,{expires:7,path:"/"});
	localStorage.setItem("total",0);
	
	$("#go_cats").html(0);
	$("#go_cats").attr("href","shopcats.html");
	refreshCats();
	}
}


function totalPrice(){
	var totalPrice=0;
	var num = $("#cast_items tr").length-1;
	
	for(var i=0;i<num;i++){
		var price = parseFloat($("#cast_items tr:eq("+i+") .price_item_css").text());
		totalPrice+=price;
	}
	
	$("#total_count").html(localStorage.getItem("total"));
	$(".carts-prices").html("￥"+formatPrice(totalPrice));
}

function numChange(obj,pid,type){
	var num;
	if(type<0){
		num = parseInt($(obj).next().val())-1;
		num = num<0?0:num;
		$(obj).next().val(num);
	}else if(type>0){
		num = parseInt($(obj).prev().val())+1;
		$(obj).prev().val(num);
	}else{
		num = $(obj).val();
	}
	if(num==null||num==''||num<1){
		num=1;
	}
//	var count= parseInt($.cookie("id"+pid+"num"));
	var count= parseInt(localStorage.getItem("id"+pid+"num"));
//	var total = parseInt($.cookie("total"));
	var total = parseInt(localStorage.getItem("total"));
//	$.cookie("total",(total+(num-count)),{expires:7,path:"/"});
	localStorage.setItem("total",(total+(num-count)),{expires:7,path:"/"});
//	$.cookie("id"+pid+"num",num,{expires:7,path:"/"});
	localStorage.setItem("id"+pid+"num",num,{expires:7,path:"/"});
	refreshCats();
}


function formatPrice(price){
	try{
		price = parseFloat(price);
		return price.toFixed(2).toString();
	}catch(e){
		//TODO handle the exception
	}
	return price;
}

