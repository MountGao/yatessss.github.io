$(document).ready(function(){
	bannerAnimate();
	onScroll();

});


function onScroll(){
	$(window).scroll(function(){

		var top = $(document).scrollTop();
		var menu = $("#navi-menu");
		var eachContent = $("#main-body").find(".content-top");
		var contentId = "";
		
		//导航栏按内容亮起对应标题
		eachContent.each(function(){
			var _this = $(this);
			var contentTop = _this.offset().top;
			if( top > contentTop - 250){
				contentId = "#" + _this.attr("id");
			}else{
				return false;
			}
		});

		var activeLi = menu.find(".navi-active");
		if( contentId && activeLi.attr("href") != contentId ){
			activeLi.removeClass("navi-active");
			menu.find("[href=" + contentId + "]").addClass("navi-active");
		}
		if(top == 0){ //导航栏显示or隐藏
			$("#header-area").stop(true,false).animate({top:"-60px"},500);
		}
		else if(top > 0){
			$("#header-area").stop(true,false).animate({top:"0px"},500);
		}
		// console.log(eachContent);
	});
} 

//banner动画效果
function bannerAnimate(){
	//第一部分动画
	$("#banner-content h1").delay(1000).animate({opacity:"1"},3000);
	$("#banner-content h2").delay(4000).animate({opacity:"1"},3000);
	$("#banner-content p").delay(7000).animate({opacity:"1"},3000);
	$("#banner-content span").delay(10000).animate({opacity:"1"},3000);
	$("#banner-content").delay(13000).animate({opacity:"0"},3000,
		function(){
		$("#banner-content").css("display","none");
		$("#banner-content2").css("display","block");
	});
	//第二部分动画
	$("#banner-content2 .step-1").delay(16000).animate({opacity:"1"},3000);
	$("#banner-content2 p span").delay(16000).animate({opacity:"1"},3000);
	$("#banner-content2 .step-2").delay(19000).animate({opacity:"1"},3000);
	$("#banner-content2 .step-3").delay(22000).animate({opacity:"1"},3000);
	$("#banner-content2 .step-4").delay(25000).animate({opacity:"1"},3000);
	$("#banner-content2 .step-5").delay(28000).animate({opacity:"1"},3000);
	$("#banner-content2 p span").delay(28000).animate({opacity:"1"},3000);
	$("#banner-content2 .step-6").delay(31000).animate({opacity:"1"},3000);
	$("#banner-content2 p span").delay(31000).animate({opacity:"1"},3000);
	$("#down-arrow").delay(34000).animate({opacity:"1"},3000);

}