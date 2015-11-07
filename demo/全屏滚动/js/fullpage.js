$(document).ready(function(){
	$('#fullpage').fullpage({
		navigation : true,
		navigationPosition : 'right',
		navigationColor : '#fff',
		paddingTop : '40px' , //页面距离顶部的距离
		fixedElements : '#header-area'//设置元素固定不动 配合jquery选择器使用
	})

});

$('#navi-button').click(function(){
	if ($('#navi-menu').offset().left == 1347.953125 ) { 
		$('#navi-menu').animate({
		right:'80px',
		});
		return;
	};
	if($('#navi-menu').offset().left == 877.953125 ){
		$('#navi-menu').animate({
		right:'-390px',
		});
		return;
	}
});
