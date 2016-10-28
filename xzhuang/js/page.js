$(function(){
	$(".btn-close").click(function(){
		$(this).parent().siblings(".page-list-main").slideToggle();
	})
	
	$.get("json/page.json",function(data){
//		console.log(data);
		
		var numPerpage = 12;//定义每页存放数据的个数
		var totalNum = data.length;//totalNum指的是总共的数据

		var pageNum = Math.ceil(totalNum/numPerpage);
//		console.log(pageNum);
		var n = 0;
		function createPage(n){
			var str = "";
			for(var i = n*numPerpage;i<Math.min((n+1)*numPerpage,totalNum);i++){
			 str += '<li class="right-list">'+
			 '<dl>'+
						'<dt>'+
							'<img src="images/page/'+data[i].imgres+'" alt="" />'+
						'</dt>'+
						'<dd>'+
							'<p class="pname">'+data[i].title+'</p>'+
							'<p class="price"> ￥'+data[i].priced+' '+
								'<span>¥'+data[i].price+'</span>'+
							'</p>'+
							'<p class="pdown p_d">'+
								'<span>最近'+data[i].sale_num+'人成交</span>'+
								'<input class="page-btn js-btn" onclick="addCats(this)" data-id=\''+(JSON.stringify(data[i]))+'\' type="button"  value="加入购物车" />'+
							'</p>'+
						'</dd>'+
					'</dl>'+
				'</li>'
			}
		$(".page-right-content").html(str);
			}
		createPage(0);
		
		//通过页面的个数pageNum创建页码按钮
			for(var i = 0;i<pageNum;i++){
				var inner = "<span class='page' >"+(i+1)+"</span>"
				$(inner).insertBefore(".next")
			}
			
		//点击页码切换页面
			var  m = 0;//m为页码
			$(".page").each(function(){
				$(this).click(function(){
					createPage($(this).html()-1)
					 		m= $(this).html();
//							console.log(m)
				})
			})
		//点击上一页
			$(".prev").click(function(){
				if(m==0){
					alert("已经是第一页")
				}else if(m==1){
					alert("已经是第一页")
				}else{
					createPage(m-2);
					 m--;
				}
			})
		//点击下一页
			$(".next").click(function(){
				if(m==pageNum){
					alert("已经是最后一页")
				}else{
					createPage(m);
					m++;
				}
			})
			
	})
	
	getSearch();
	
})

function getSearch(){
	var str = getUrlParam("keywords");

		$.get("json/page.json",function(data){
//			console.log(data)
			for(var i = 0;i<data.length;i++){
				
			}
		
		})
}

 //获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}