window.onload = function(){
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
		    swiperAnimateCache(swiper); //隐藏动画元素 
		    swiperAnimate(swiper); //初始化完成开始动画
		}, 
		onSlideChangeEnd: function(swiper){ 
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		} 
    });
    var oMusic = document.getElementById('music');
	var oAud = document.getElementById('music-audio');
		oAud.play()
		var onOff = true;
		oMusic.onclick = function(){
			if(onOff){
				oAud.pause();
				oMusic.style.animationPlayState="paused";
				onOff = false;
			}
			else{
				oAud.play();
				oMusic.style.animationPlayState="running";
				onOff = true;
			}
		}
}
