function submit(){
    var getText= document.getElementById('text-input').value;
    
    var inputValue = trim(getText);
    
    if(!inputValue){
    	return showError('输入不能为空');
    }
    
    var arr = inputValue.split(/[,，、;\s\t\n]/);
    
    arr = uniqArray(arr);
    arr = clearEmpty(arr);
    
    if(arr.length>10){
    	return showError('爱好不能超过10个');
    }
    
    var p = document.createElement('p');

    each(arr,function (item,i){
        var checkbox =document.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('id','checkboxid'+i);
        var label = document.createElement('label');
        label.setAttribute('for','checkboxid'+i);
        label.innerHTML = item;
        p.appendChild(checkbox);
        p.appendChild(label);
    });

    addp(p,event.target);

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

function clearEmpty(arr) {
    var result = [];

    each(arr, function (item) {
        if (item) {
            result.push(item);
        }
    });

    return result;
}

function addp(newElement, existElement) {

    var existParent = existElement.parentNode;

    if (existParent) {
        existParent.insertBefore(newElement, existElement.nextSibling);
    }
    return newElement;
}

