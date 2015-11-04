window.onload = function(){
	add_break_line();
	return document.body.clientWidth;
}
console.log(window.onload())

function add_break_line(){
	var ele_class = document.getElementsByClassName('break-line');
	console.log(ele_class);
	for (var i = 0; i < ele_class.length; i++) {
		var parent_height = ele_class[i].parentNode.offsetHeight-80;
		ele_class[i].style.border = 'none';
		ele_class[i].style.borderLeft = '2px solid #D7D7D7';
		ele_class[i].style.width = '0px';
		ele_class[i].style.height = parent_height +'px';
		ele_class[i].style.position = 'absolute';
		ele_class[i].style.left = '-15px';
		ele_class[i].style.top = '50px';
		ele_class[i].style.boxShadow = '1px 0 0 #5F5F5F, 2px 0 0 #595959';
		console.log(ele_class[i].parentNode.offsetHeight);
	};
}
