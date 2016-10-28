$(function(){
	$(".allproduct-type").mouseenter(function(){
		$(".allproducts-type-nav").show();
	})
	$(".allproducts-type-nav").mouseleave(function(){
		$(".allproducts-type-nav").hide();
	})
	
//	登录部分开始
	$(".form-horizontal").submit(function() {//点击登录提交时触发事件
			// 1.存取cookie
			$.cookie("username",$("#username").val(),{expires:7});
			// 2.判断复选框状态，true为选中状态
			var Checked = $("#checkbox").prop("checked");
	
	
				var UserName = $.cookie().username;
				var Password = $.cookie().password;
				if ($("#username").val()==UserName&&$("#password").val()==Password) {
					$(form).attr({action:'index.html'});
				}else if($("#username").val()==""){
					alert("请输入用户名");
				}else if($("#password").val()==""){
					alert("请输入密码");
				}else{
					alert("用户名或密码不正确，请重新填写！");
				}
	
			//prop是设置属性，此处给checkbox设置是否选中属性checked
	
			// if(Checked==true){
			// 	window.location.href = "login.html#checked"
			// }//判断当复选框被选中状态时跳转
			return false;//阻止提交
		});
			// 3.点击时勾选记住用户名
			$("#checkbox").click(function(event) {
				// 4.创建一个状态choice 存入cookie  ---- 让数据持久化 
				//$.cookie("choice","checked",{expires:7});
			});
	
	
			jQuery(document).ready(function($) {
	
			// var remember = window.location.search.replace(/\#/,"");//存取在地址栏里边
			// 5.获取之前存入的状态
			var Checked = $.cookie().choice;
			// 6.用户是否记住用户名
			if(Checked=="checked"){
				// 7.复选框选中
				var Checked = $("#checkbox").prop("checked",true)
				// 8.用户名进行赋值
				$("#username").val(($.cookie().username));
			}
		});
//		登录部分结束
	
})
