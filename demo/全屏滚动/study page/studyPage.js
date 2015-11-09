/*$(document).ready(function(){
	$('#fullpage').fullpage({
		navigation : true,
		navigationPosition : 'right',
		navigationColor : '#fff',
		paddingTop : '40px' , //页面距离顶部的距离
		fixedElements : '#header-area'//设置元素固定不动 配合jquery选择器使用
	})

});*/

$('#navi-button').click(function(){
	var width = $(document).width();
	if ($('#navi-menu').offset().left > width ) { 
		console.log($(document).width());
		$('#navi-menu').animate({
		right:'80px',
		});
		return;
	};
	if($('#navi-menu').offset().left < width ){
		console.log($(document).width());
		$('#navi-menu').animate({
		right:'-500px',
		});
		return;
	}
});
