$(document).ready(function(){
	bannerAnimate();
	onScroll();
	backTop()
	downArrow()

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
			$("#header-area").stop(true,false).animate({top:"-61px"},400);
		}
		else if(top > 0){
			$("#header-area").stop(true,false).animate({top:"0px"},400);
		}
		// console.log(eachContent);
	});
} 

//banner动画效果
function bannerAnimate(){
	//第一部分动画
	$("#banner-content h1").delay(1000).animate({opacity:"1"},2000);
	$("#banner-content h2").delay(3000).animate({opacity:"1"},2000);
	$("#banner-content p").delay(5000).animate({opacity:"1"},2000);
	$("#banner-content span").delay(7000).animate({opacity:"1"},2000);
	$("#banner-content").delay(9000).animate({opacity:"0"},2000,
		function(){
		$("#banner-content").css("display","none");
		$("#banner-content2").css("display","block");
	});
	//第二部分动画
	$("#banner-content2 .step-1").delay(11000).animate({opacity:"1"},2000);
	$("#banner-content2 p span").delay(11000).animate({opacity:"1"},2000);
	$("#banner-content2 .step-2").delay(13000).animate({opacity:"1"},2000);
	$("#banner-content2 .step-3").delay(15000).animate({opacity:"1"},2000);
	$("#banner-content2 .step-4").delay(17000).animate({opacity:"1"},2000);
	$("#banner-content2 .step-5").delay(19000).animate({opacity:"1"},2000);
	$("#banner-content2 p span").delay(19000).animate({opacity:"1"},2000);
	$("#banner-content2 .step-6").delay(21000).animate({opacity:"1"},2000);
	$("#banner-content2 p span").delay(23000).animate({opacity:"1"},2000);
	$("#down-arrow").delay(24000).animate({opacity:"1"},2000);

}

function backTop(){
	$("#back-top").click(function(){
		var disTop = $(document).scrollTop();
		var speed = Math.ceil(disTop/8);
		$("body,htm").animate({scrollTop: 0},speed);
	});
}

function downArrow(){
	$("#down-arrow").click(function(){
		var speed = 1000;
		$("body,htm").animate({scrollTop:630},speed);
	});
}
