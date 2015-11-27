function submit(){
    var getText= document.getElementById('text-input').value;
    var inputValue = trim(getText);
    if(!inputValue){
    	return showError('输入不能为空');
    }
    var arr = inputValue.split(/[,，、;\s\t\n]/);
    arr = uniqArray1(arr);
    arr = clearEmptyArr(arr);
    if(arr.length>10){
    	return showError('爱好不能超过10个');
    }
    
    
    console.log(arr);
}

function trim(str) {

    var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");

    return String(str).replace(trimer, "");

}

function showError(content){
	var show = document.getElementById('error');
	if(!content){
		show.innerHTML='';
	}
	else{
		show.innerHTML = content;
	}
}

function clearEmptyArr(arr){
    var result=[];
    each(arr,function(i){
        if(i){
        result.push(i);
        }        
    });
    return result;
}