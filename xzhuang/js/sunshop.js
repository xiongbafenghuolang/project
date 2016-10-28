$(document).ready(function(){
	$.get("json/sunshop.json",function(data){
		console.log(data);
		
		var numPerpage = 16;
		var totalNum = data.length;
		var pageNum = Math.ceil(totalNum/numPerpage);
		var n = 0;
		function createPage(n){
			var str = "";
			for(var i = n*numPerpage;i<Math.min((n+1)*numPerpage,totalNum);i++){
			str +='<li>'+
					'<p class="sunshop-img">'+
						'<a href="myinfo.html?pid='+data[i].id+'&index=2">'+
							'<img src="images/'+data[i].imgres+'" alt="" />'+
						'</a>'+
					'</p>'+
					'<p class="sunshop-name">'+
						'<a href="" class="sunshop-title">'+data[i].title+'</a>'+
					'</p>'+
					'<p class="sunshop-price">'+
						'<b>￥ '+data[i].priced+'</b>'+
						'<span>￥'+data[i].price+'</span>'+
					'</p>'+
				'</li>'
			}
			$('.sunshop-main').html(str)
		}
		createPage(0);
		//通过pageNum创建页码按钮
		for(var i = 0;i<pageNum;i++){
			var inner = "<span class='page'>"+(i+1)+"</span>";
			$(inner).insertBefore(".next");
		}
		//点击页码切换页码
		var m = 0;
		$(".page").each(function(){
			$(this).click(function(){
				createPage($(this).html()-1);
				m = $(this).html();
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
	
	
})
