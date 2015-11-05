/*非常重要！
*经过查询document.getElementById().style 只能获取html内部的样式
*
*如果样式写在CSS中，这个命令无法获取到样式表里的样式
*
*所以在下面执行document.getElementById().style时会获取到‘空’
*所以用一个函数getStyle解决无法获取样式表样式的问题
*/

//geted-- 要获取样式的id
var getStyle =function(geted){
		//IE获取样式
		if(geted.currentStyle){
			var thisStyle = geted.currentStyle;
		} 
		//chrom获取样式
		else{
			var thisStyle = document.defaultView.getComputedStyle(geted, null);
		}
	return thisStyle;
}

var container = document.getElementById('container');
var pic = document.getElementById('pic');
var btn = document.getElementById('btn').getElementsByTagName('span');
var perv = document.getElementById('perv');
var next = document.getElementById('next');
var index = 1;
var timer;
/*var timer = setTimeout(function(){
			var picDisWindow = index*-600;
			var speed =Math.ceil(picDisWindow/3);
			pic.style.left = picPosition - Math.ceil(picDisWindow/3) +'px';
		},30)	*/

window.onload = function(){
	next.onclick = function(){
		picScroll(-600);
		/*var picPosition = parseInt(getStyle(pic).left);
			pic.style.left = picPosition - 600 +'px';
		var picLeft = parseInt(pic.style.left);
		if(picLeft < -3600){
			pic.style.left = -600 +'px';
		}*/
		showBtn();
		clearInterval(timer);
	}

	perv.onclick = function(){
		picScroll(600);
		/*var picPosition = parseInt(getStyle(pic).left);
			pic.style.left = picPosition + 600 +'px';
		var picLeft = parseInt(pic.style.left);
		if(picLeft > -600){
			pic.style.left = -3600 +'px';
		}*/
		showBtn();

	}

	var showBtn = function(){
		for(var i = 0,len = btn.length; i < len ; i ++){
			btn[i].className = '';
		}
		var picLeft = parseInt(pic.style.left);
		console.log(picLeft);
		var whichBtn = Math.round(Math.abs(picLeft)/600);
		index = whichBtn;

		btn[index - 1].className = 'onpic';
	}
	//给每个原点加点击事件
	for(var i = 0,len = btn.length; i < len ; i ++){
		btn[i].onclick = function(){
		var myIndex = this.getAttribute('index');
		//加入判断 如果点击还是该原点 就跳出函数
		if(myIndex==index){
			return;
		}
		var offset = (myIndex - index )*-600 ;
		var picPosition = parseInt(getStyle(pic).left);
		pic.style.left = picPosition + offset +'px';
		index = myIndex;
		showBtn();
		}
	}
	var picScroll = function(canshu){
		var picPosition = parseInt(getStyle(pic).left);
			pic.style.left = picPosition + canshu +'px';
		var picLeft = parseInt(pic.style.left);

		if(picLeft > -600){
			pic.style.left = -3600 +'px';
		}
		if(picLeft < -3600){
			pic.style.left = -600 +'px';
		}
	}

	//第一种方法
	/*setInterval(next.onclick,3000);*/


	//第二种方法 
/*	function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
        }, 3000);
    }
    function stop() {
        clearTimeout(timer);
    }*/

	//第三种方法 
	function play(){
		var timer = setInterval(function(){
			next.click();
		},3000)
	}
	function stop(){
		clearInterval(timer);
	}

	play();

	/*var picScroll = function(canshu){

		var picPosition = parseInt(getStyle(pic).left);//图片初始的left
		var toWhere = picPosition + canshu;//图片目标位置的left
		console.log(toWhere);
		var picLeft = parseInt(pic.style.left);//图片此时的left
		console.log(picLeft);
		var speed = Math.round(canshu/5);
		var time = 10 ;

		var toGo = function(){
			if((speed > 0 && parseInt(pic.style.left) < toWhere) || (speed < 0 && parseInt(pic.style.left) > toWhere)){
				pic.style.left = picPosition + speed +'px';
				setTimeout(toGo, time);
			}
			else{
				pic.style.left = toWhere + 'px';
				if(picLeft > -600){
				pic.style.left = -3600 +'px';
				}
				if(picLeft < -3600){
					pic.style.left = -600 +'px';
				}
			}
		}
		toGo();
	}*/

		/*var timer = setTimeout(function(){
			var picDisWindow = index*-600;
			console.log(picDisWindow);
			var speed =Math.ceil(picDisWindow/2);
			console.log(speed);
			pic.style.left =  picPosition - speed +'px';
			console.log(pic.style.left);
		},30)	*/


	/*var picScroll = function(canshu){
		var picPosition = parseInt(getStyle(pic).left);
		console.log(picPosition);
			pic.style.left = picPosition + canshu +'px';
		var picLeft = parseInt(pic.style.left);
		if(picLeft < -3600){
			pic.style.left = -600 +'px';
		}
		if(picLeft > -600){
			pic.style.left = -3600 +'px';
		}
	}*/
		
}
