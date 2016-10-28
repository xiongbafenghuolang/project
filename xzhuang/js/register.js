$(function(){
	$(".allproduct-type").mouseenter(function(){
		$(".allproducts-type-nav").show();
	})
	$(".allproducts-type-nav").mouseleave(function(){
		$(".allproducts-type-nav").hide();
	})
//	注册部分
	$(".form-horizontal").on("submit",function(event) {
			// alert(1)

			var username = $("#username");
			var n1 = checkusername(username);
			var password = $("#password");
			var n2 = checkpassword(password);
			var clickphone = $("#clickphone");
			var n3 = checkphone(clickphone);
			var clickemail = $("#clickemail");
			var n4 = checkemail(clickemail);
			
			var code_gg = $("#clickcode").val();
			$.post("php/chk_code.php?act=gg",{code:code_gg},function(msg){
				if(n1!=true){
					alert("输入账号不正确，账号必须为手机号码，必须以1开头，第二位为3/4/5/8任意一个")
				}else if(n2!=true){
					alert("输入密码不正确，密码必须为6-12位的数字或字母！！")
				}else if(n3!=true){
					alert("输入电话号码不正确，电话号码必须以1开头，第二位是3~9！！")
				}else if(n4!=true){
					alert("输入邮箱不符合规范！！")
				}else if(msg!=1){
	                alert("验证码错误！！"); 
	            }else if(username.val()==$.cookie().username){
	            	alert("账号已注册，请重新输入！！！")
	            }else if(n1==true&&n2==true&&n3==true&&n4==true){
				$.cookie("username",$("#username").val(),{expires:7});
				$.cookie("password",$("#password").val(),{expires:7});
				$.cookie("clickname",$("#clickname").val(),{expires:7});
				$.cookie("clickage",$("#clickage").val(),{expires:7});
				$.cookie("clicksex",$("#clicksex").val(),{expires:7});
				$.cookie("clickphone",$("#clickphone").val(),{expires:7});
				$.cookie("clickemail",$("#clickemail").val(),{expires:7});
				window.location = "login.html";

				}
			});
			return false;
		});

	// 账号校验

	function checkusername(obj){
		if(/^1[3|4|5|8]\d{9}$/.test(obj.val())){
			obj.parent().addClass(' has-success has-feedback').append(' <span class="glyphicon glyphicon-ok form-control-feedback"></span>');
			return true;
		}else{
			obj.parent().addClass('has-error has-feedback').append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
			return false;

		}

	}
		// 账号获得焦点
		$("#username").on("focus",function(){
			$(this).parent().toggleClass('has-success has-feedback');
			$(this).next().remove();
		})
	// 密码校验
	function checkpassword(obj){
		if(/^[\d_a-zA-Z]{6,12}$/.test(obj.val())){
			obj.parent().addClass(' has-success has-feedback').append(' <span class="glyphicon glyphicon-ok form-control-feedback"></span>');
			return true;
		}else{
			obj.parent().addClass('has-error has-feedback').append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
			return false;
		}
	}
		// 密码获得焦点
		$("#password").on("focus",function(){
			$(this).parent().toggleClass('has-success has-feedback');
			$(this).next().remove();
		})
	//电话号码校验
	function checkphone(obj){
		if(/(1[3-9]\d{9}$)/.test(obj.val())){
			obj.parent().addClass(' has-success has-feedback').append(' <span class="glyphicon glyphicon-ok form-control-feedback"></span>');
			return true;
		}else{
			obj.parent().addClass('has-error has-feedback').append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
			return false;
		}
	}
		// 电话号码获得焦点
		$("#clickphone").on("focus",function(){
			$(this).parent().toggleClass('has-success has-feedback');
			$(this).next().remove();
		})
	//邮箱校验
	function checkemail(obj){
		if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(obj.val())){
			obj.parent().addClass(' has-success has-feedback').append(' <span class="glyphicon glyphicon-ok form-control-feedback"></span>');
			return true;
		}else{
			obj.parent().addClass('has-error has-feedback').append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
			return false;
		}
	}
		// 邮箱获得焦点
		$("#clickemail").on("focus",function(){
			$(this).parent().toggleClass('has-success has-feedback');
			$(this).next().remove();
		})
	//	验证码判断
	$(function(){
		$("#getcode_gg").click(function(){
			$(this).attr("src",'php/code_gg.php?' + Math.random());
		});

	})
})
