window.onload = function(){
	add_break_line();
	return document.body.clientWidth;
}
console.log(window.onload())

function add_break_line(){
	var ele = document.getElementById('break-line');
	console.log(ele);
	for (var i = 0; i < ele.length; i++) {
		var parent_height = ele.parentNode.offsetHeight-80;
		ele[i].style.border = 'none';
		ele[i].style.borderLeft = '5px dotted #333333';
		ele[i].style.width = '2px';
		ele[i].style.height = parent_height +'px';
		ele[i].style.margin = '50px 0 20px 3px';
		ele[i].style.position = 'absolute';
		console.log(ele[i]);
	};
}
