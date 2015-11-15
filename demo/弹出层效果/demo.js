window.onload = function(){
	var obtn = document.getElementById('btnLogin');
		obtn.onclick = function(){
	//弹出的遮盖层
		var wHeight = document.body.scrollHeight;
		var	wWidth = document.body.scrollWidth;
		var oMask = document.createElement('div');
			oMask.id = "mask";
			oMask.style.height = wHeight + 'px';
			oMask.style.width = wWidth + 'px';
			document.body.appendChild(oMask);
		//弹出的登录块
		var oLogin = document.createElement('div');
			oLogin.id = "login";
			oLogin.innerHTML = "<div class='loginCon'><div id='close'>点击关闭</div></div>" 
			document.body.appendChild(oLogin);
			
		var iHeight = oLogin.offsetHeight;
		var iWidth = oLogin.offsetWidth;
			oLogin.style.left = wWidth/2 - iWidth/2 +'px';
			oLogin.style.top = wHeight/2 - iHeight/2 +'px';
			
		var oClose = document.getElementById('close');
			oClose.onclick = oMask.onclick = function(){
				document.body.removeChild(oLogin);
				document.body.removeChild(oMask);
			}	
		}
}