window.onload = function(){
	var obtn = document.getElementById('button');
	var timer;

	//点击按钮事件
	obtn.onclick = function(){
		//定时器
		timer = setInterval(function(){
			var disTop = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = Math.ceil(disTop/8);
			document.documentElement.scrollTop = document.body.scrollTop = disTop - speed;
			onscroll = true;
			if(disTop==0){
				clearInterval(timer);
			}
		}, 30) 
	}

	//触发滚动条事件
	var onscroll = true;
	var clientHeight = document.documentElement.clientHeight;
	window.onscroll = function(){
		if(!onscroll){
			clearInterval(timer);
		}
		onscroll = false;
		//当超过首屏距离时 按钮显示   首屏按钮隐藏
		var disTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(disTop > clientHeight){
			obtn.style.display = 'block';
		}
		else{
			obtn.style.display = 'none';
		}

		console.log(clientHeight);
	}


	



}