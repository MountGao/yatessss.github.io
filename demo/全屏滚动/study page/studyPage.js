$(document).ready(function(){
	naviBtn();
	animate();

});

var naviBtn =function(){
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
}

function animate(){
	$('#cover-layer').animate({opacity: '0.8'},2000,
		function(){$('#banner-content h1').animate({opacity:'1'},1500,
			function(){$('#banner-content h2').animate({opacity:'1'},1500,
				function(){$('#banner-content a').animate({opacity:'1'},1500);}
			);}
		);}
	);
}
