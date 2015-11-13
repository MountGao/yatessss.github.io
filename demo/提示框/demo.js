var tooltip1 = document.getElementById('tooltip1');
//判断是否为IE浏览器
var isIE = navigator.userAgent.indexOf('MSIE') > -1;

var className = 'tooltip-box';
function showTooltip(obj,id, html, width, height){
	if(document.getElementById(id) == null){
		var tooltipBox = document.createElement('div');
		tooltipBox.id = id;
		tooltipBox.className = className;
		tooltipBox.innerHTML = html;
		obj.appendChild(tooltipBox);
		tooltipBox.style.position = "absolute";
	    tooltipBox.style.display = "block";
	    tooltipBox.style.left = obj.offsetLeft + 20 +'px' ; 
	    tooltipBox.style.top = obj.offsetTop + 20 +'px';

	    if(tooltipBox.style.left +　tooltipBox.offsetWidth > document.body.clientWidth){
	    	tooltipBox.style.width = document.body.clientWidth - tooltipBox.offsetWidth - document.getElementById("container").offsetLeft + 'px';
	    }

	    tooltipBox.style.width = width ? width + 'px' : 'auto';
	    tooltipBox.style.height = height ? height + 'px' : 'auto';
	    if(!width && isIE){
	    	tooltipBox.style.width = tooltipBox.offsetWidth;
	    }


	    obj.onmouseleave = function(){
			document.getElementById(id).style.display = "none";
		}
	}

	else{
		document.getElementById(id).style.display = 'block';
	}
}	

var t1 = document.getElementById("tooltip1");
var t2 = document.getElementById("tooltip2");
var t3 = document.getElementById("tooltip3");

t1.onmouseenter = function(){
	showTooltip(this, "t1", '一部连续剧的名字', 200);
}

t2.onmouseenter = function(){
	showTooltip(this, "t2", '<img src = "W020081010392868123022.jpg ">', 340);
}

t3.onmouseenter = function(){
	showTooltip(this, "t3", '<iframe src = "http://www.tudou.com/v/mBWnceRbMug/&resourceId=63884113_04_02_99&tid=0/v.swf" width = "600" height = "450"> </frame>', 600, 450);
}





