

/**
 * mini $
 *
 * @param {string} selector ѡ����
 * @return {Array.<HTMLElement>} ����ƥ���Ԫ���б�
 */
function $(selector) {
    var idReg = /^#([\w_\-]+)/;
    var classReg = /^\.([\w_\-]+)/;
    var tagReg = /^\w+$/i;
    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;

    // ������'>' ��`~`��Ƕ�׹�ϵ
    // ����ѡ����֮���ÿո����
    var context = document;

    function blank() {}

    function direct(part, actions) {
        actions = actions || {
            id: blank,
            className: blank,
            tag: blank,
            attribute: blank
        };
        var fn;
        var params = [].slice.call(arguments, 2);
        // id
        if (result = part.match(idReg)) {
            fn = 'id';
            params.push(result[1]);
        }
        // class
        else if (result = part.match(classReg)) {
            fn = 'className';
            params.push(result[1]);
        }
        // tag
        else if (result = part.match(tagReg)) {
            fn = 'tag';
            params.push(result[0]);
        }
        // attribute
        else if (result = part.match(attrReg)) {
            fn = 'attribute';
            var tag = result[1];
            var key = result[2];
            var value = result[4];
            params.push(tag, key, value);
        }
        return actions[fn].apply(null, params);
    }

    function find(parts, context) {
        var part = parts.pop();

        var actions = {
            id: function (id) {
                return [
                    document.getElementById(id)
                ];
            },
            className: function (className) {
                var result = [];
                if (context.getElementsByClassName) {
                    result = context.getElementsByClassName(className)
                }
                else {
                    var temp = context.getElementsByTagName('*');
                    for (var i = 0, len = temp.length; i < len; i++) {
                        var node = temp[i];
                        if (hasClass(node, className)) {
                            result.push(node);
                        }
                    }
                }
                return result;
            },
            tag: function (tag) {
                return context.getElementsByTagName(tag);
            },
            attribute: function (tag, key, value) {
                var result = [];
                var temp = context.getElementsByTagName(tag || '*');

                for (var i = 0, len = temp.length; i < len; i++) {
                    var node = temp[i];
                    if (value) {
                        var v = node.getAttribute(key);
                        (v === value) && result.push(node);
                    }
                    else if (node.hasAttribute(key)) {
                        result.push(node);
                    }
                }
                return result;
            }
        };

        var ret = direct(part, actions);

        // to array
        ret = [].slice.call(ret);

        return parts[0] && ret[0] ? filterParents(parts, ret) : ret;
    }

    function filterParents(parts, ret) {
        var parentPart = parts.pop();
        var result = [];

        for (var i = 0, len = ret.length; i < len; i++) {
            var node = ret[i];
            var p = node;

            while (p = p.parentNode) {
                var actions = {
                    id: function (el, id) {
                        return (el.id === id);
                    },
                    className: function (el, className) {
                         return hasClass(el, className);
                    },
                    tag: function (el, tag) {
                        return (el.tagName.toLowerCase() === tag);
                    },
                    attribute: function (el, tag, key, value) {
                        var valid = true;
                        if (tag) {
                            valid = actions.tag(el, tag);
                        }
                        valid = valid && el.hasAttribute(key);
                        if (value) {
                            valid = valid && (value === el.getAttribute(key))
                        }
                        return valid;
                    }
                };
                var matches = direct(parentPart, actions, p);

                if (matches) {
                    break;
                }
            }

            if (matches) {
                result.push(node);
            }
        }

        return parts[0] && result[0] ? filterParents(parts, result) : result;
    }

    var result = find(selector.split(/\s+/), context);

    return result;
}

/**
* �ж��Ƿ���ĳ��className
* @param {HTMLElement} element Ԫ��
* @param {string} className className
* @return {boolean}
*/
function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}

/**
* ���className
*
* @param {HTMLElement} element Ԫ��
* @param {string} className className
*/
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className = element.className ?[element.className, className].join(' ') : className;
    }
}

/**
* ɾ��Ԫ��className
*
* @param {HTMLElement} element Ԫ��
* @param {string} className className
*/
function removeClass(element, className) {
    if (className && hasClass(element, className)) {
        var classNames = element.className.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] === className) {
                classNames.splice(i, 1);
                break;
            }
        }
    }
    element.className = classNames.join(' ');
}

/**
 * �ж��Ƿ����ֵ�Ԫ��
 *
 * @param {HTMLElement} element htmlԪ��
 * @param {HTMLElement} siblingNode �ж�Ԫ��
 * @return {boolean}
 */
function isSiblingNode(element, siblingNode) {
    for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
        if (node === siblingNode) {
            return true;
        }
    }
    return false;
}

/**
 * ��ȡԪ�������������������Ͻǵ�λ��
 * ע�⣺�����ĵ����Ͻǣ������������ĵ����Ͻǣ�����Ҫ����scrollTop��scrollLeft
 *
 * @param {HTMLElement} element Ԫ��
 * @return {Object} λ��
 */
function getPosition(element) {
    var box = element.getBoundingClientRect();
    return box;
}


// Ϊ�˱��ڲ��Ұ󶨹����¼���������һ�������ռ�
$.event = {
    listeners: []
};


// ��һ��element��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
$.event.addEvent = function(element, type, listener) {
    type = type.replace(/^on/i, '').toLowerCase();

    var lis = $.event.listeners;

    var realListener = function (e) {
        if (typeof listener === 'function') {
            listener.call(element, e);
        }
    };

    if (element.addEventListener) {
        element.addEventListener(type, realListener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + type, realListener);
    }

    lis[lis.length] = [element, type, listener, realListener];

    return element;
};

// �Ƴ�element�������event�¼�����ʱִ��listener����Ӧ
$.event.removeEvent = function (element, type, listener) {
    type = type.replace(/^on/i, '').toLowerCase();

    var lis = $.event.listeners;
    var len = lis.length;

    while (len--) {
        var item = lis[len];
        var isRemoveAll = !listener;

        // listener����ʱ���Ƴ�element��������listener������type�����¼�
        // listener������ʱ���Ƴ�element������type�����¼�
        if (item[1] === type
            && item[0] === element
            && (isRemoveAll || item[2] === listener)) {
            var realListener = item[3];

            if (element.removeEventListener) {
                element.removeEventListener(type, realListener, false);
            }
            else if (element.detachEvent) {
                element.detachEvent('on' + type, realListener);
            }

            lis.splice(len, 1);
        }
    }

    return element;
};

// ʵ�ֶ�click�¼��İ�
function addClickEvent(element, listener) {
    return $.event.addEvent(element, 'click', listener);
}

// ʵ�ֶ��ڰ�Enter��ʱ���¼���
function addEnterEvent(element, listener) {
    return $.event.addEvent(element, 'keypress', function (e) {
        var event = e || window.event;
        var keyCode = event.which || event.keyCode;

        if (keyCode === 13) {
            listener.call(element, event);
        }
    });
}

// �¼�����
$.event.delegateEvent = function(element, tag, eventName, listener) {
    $.event.addEvent(element, eventName, function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;

        if (target && target.tagName === tag.toUpperCase()) {
            listener.call(target, event);
        }
    });
}

$.on = function (selector, event, listener) {
    return $.event.addEvent($(selector), event, listener);
};

$.click = function (selector, listener) {
    return $.event.addEvent($(selector), 'click', listener);
};

$.un = function (selector, event, listener) {
    return $.event.removeEvent($(selector), 'click', listener);
};

$.delegate = function (selector, tag, event, listener) {
    return $.event.delegateEvent($(selector), tag, event, listener);
};




/**
 * @file util2
 * @author junmer
 * @description �������ͼ����Ի���
 */


/**
 * �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
 *
 * @param  {any}  arr Ŀ�����
 * @return {boolean}        �жϽ��
 */
function isArray(arr) {
    return '[object Array]' === Object.prototype.toString.call(arr);
}

/**
 * �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
 *
 * @param  {any}  fn Ŀ�����
 * @return {boolean}        �жϽ��
 */
function isFunction(fn) {
    // chrome��,'function' == typeof /a/ Ϊtrue.
    return '[object Function]' === Object.prototype.toString.call(fn);
}

/**
 * �ж�һ�������ǲ������������󣬼��ж���������ǲ�����{}����new Object���Ʒ�ʽ����
 *
 * ��ʵ����˵����Javascript�����У��κ��ж϶�һ������©������˱�����ֻ���һЩ��õ�����������ж�
 *
 * @returns {Boolean} �����
 */
function isPlain(obj){
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        key;
    if ( !obj ||
         //һ��������ֱ����toString�ж�
         Object.prototype.toString.call(obj) !== "[object Object]" ||
         //IE�£�window/document/document.body/HTMLElement/HTMLCollection/NodeList��DOM������һ�����Ϊtrue
         //isPrototypeOf����Object.prototype�ϵģ�������е���������Ӧ�û����������
         //������window�Ϲ���isPrototypeOf���Ե������ֱ�Ӻ��Բ�����
         !('isPrototypeOf' in obj)
       ) {
        return false;
    }

    //�ж�new fun()�Զ����������
    //constructor���Ǽ̳���ԭ������
    //����ԭ������isPrototypeOf��������Object
    if ( obj.constructor &&
        !hasOwnProperty.call(obj, "constructor") &&
        !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //�ж��м̳е����
    //�����һ���Ǽ̳й����ģ���ôһ������������Object
    //OwnProperty�����ȱ�������Ϊ�˼��ٱ������̣�ֱ�ӿ����һ��
    for ( key in obj ) {}
    return key === undefined || hasOwnProperty.call( obj, key );
}


/**
 * ��һ��object������ȿ���
 *
 * ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
 * �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
 *
 * @param  {Object} source ��Ҫ���п����Ķ���
 * @return {Object} ��������¶���
 */
function cloneObject (source) {
    var result = source, i, len;
    if (!source
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (isArray(source)) {
        result = [];
        var resultLen = 0;
        for (i = 0, len = source.length; i < len; i++) {
            result[resultLen++] = cloneObject(source[i]);
        }
    } else if (isPlain(source)) {
        result = {};
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                result[i] = cloneObject(source[i]);
            }
        }
    }
    return result;
}

// ����������
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"



/**
 * ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
 *
 * @param  {Array} source ��Ҫ������ͬ�������
 * @return {Array}        ���˺��������
 */
function uniqArray(source) {
    var len = source.length,
        result = source.slice(0),
        i, datum;


    // �Ӻ���ǰ˫��ѭ���Ƚ�
    // �������Ԫ����ͬ��ɾ����һ��
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (datum === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
}

// hash
function uniqArray1(arr) {
    var obj = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {

        var key = arr[i];

        if (!obj[key]) {
            result.push(key);
            obj[key] = true;
        }
    }
    return result;
}


// hash + es5
function uniqArray2(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

// ʹ��ʾ��
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]


var al = 10000;
var a = [];
while (al--){
    a.push(al%2);
}


console.time('uniqArray')
console.log(uniqArray(a).length);
console.timeEnd('uniqArray')

console.time('uniqArray1')
console.log(uniqArray1(a).length);
console.timeEnd('uniqArray1')

console.time('uniqArray2')
console.log(uniqArray2(a).length);
console.timeEnd('uniqArray2')

// �м���ͬѧ��������
// ʵ��һ���򵥵�trim����������ȥ��һ���ַ�����ͷ����β���Ŀհ��ַ�
// �ٶ��հ��ַ�ֻ�а�ǿո�Tab
// ��ϰͨ��ѭ�����Լ��ַ�����һЩ�����������ֱ�ɨ���ַ���strͷ����β���Ƿ��������Ŀհ��ַ�������ɾ�����ǣ���󷵻�һ�����ȥ�����ַ���
function simpleTrim(str) {

    function isEmpty(c) {
        return /\s/.test(c);
    }

    for (var i = 0, l = str.length; i < l; i++) {
        if (!isEmpty(str.charAt(i))) {
            break;
        }
    }

    for (var j = str.length; j > 0; j--) {
        if (!isEmpty(str.charAt(j - 1))) {
            break;
        }
    }

    if (i > j) {
        return '';
    }

    return str.substring(i, j);
}

simpleTrim(' \t trimed   ')

/**
 * �ܶ�ͬѧ�϶���������Ĵ��뿴����ȥ������������������ʵ��һ��trim
 * ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
 * ����ʹ��һ�м���������ʽ��ɸ���Ŀ
 *
 * @param  {string} source Ŀ���ַ���
 * @return {string} ɾ�����˿հ��ַ�����ַ���
 */
function trim(str) {

    var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");

    return String(str).replace(trimer, "");

}

// ʹ��ʾ��
var str = '   hi!  ';
str = trim(str);
// console.log(str); // 'hi!'

// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
function each(arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++) {
        fn(arr[i], i);
    }
}

// ����fn�������Խ�������������item��index

// ʹ��ʾ��
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
// each(arr, output);  // java, c, php, html

// ʹ��ʾ��
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html


/**
 * ��ȡһ�����������һ��Ԫ�ص�����������һ������
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 *
 * @param  {Object} obj
 * @return {number} Ԫ�س���
 */
var getObjectLength = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
            toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('getObjectLength called on non-object');
        }

        var result = [],
            prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result.length;
    };
}());

// ʹ��ʾ��
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
// console.log(getObjectLength(obj)); // 3

// todo �� shicai������

// Ϊdom����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    var result;
    var valid = typeof newClassName === "string";

    if (valid) {
        var classes = (newClassName || "").match(/\S+/g) || [];
        var elemClasses = element.className;
        var cur = element.nodeType === 1 && (elemClasses ?
                (" " + elemClasses + " ").replace(/[\t\r\n\f]/g, " ") :
                " ");
        if (cur) {
            var len = classes.length;
            for (var i = 0; i < len; i++) {
                if (cur.indexOf(" " + classes[i] + " ") < 0) {
                    cur += classes[i] + " ";
                }
            }

            result = trim(cur);
            if (elemClasses !== result) {
                element.className = result;
            }
        }
    }
}
// �Ƴ�dom�е���ʽoldClassName
function removeClass(element, oldClassName) {
    var result;
    var valid = typeof oldClassName === "string";

    if (valid) {
        var classes = (oldClassName || "").match(/\S+/g) || [];
        var elemClasses = element.className;
        var cur = element.nodeType === 1 && (elemClasses ?
            (" " + elemClasses + " ").replace(/[\t\r\n\f]/g, " ") :
            " ");
        if (cur) {
            var len = classes.length;
            for (var i = 0; i < len; i++) {
                if (cur.indexOf(" " + classes[i] + " ") >= 0) {
                    cur = cur.replace(" " + classes[i] + " ", " ");
                }
            }

            result = trim(cur);
            if (elemClasses !== result) {
                element.className = result;
            }
        }
    }
}
// �ж�siblingNode��dom�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// ��ȡdom�������������ڵ�λ�ã�����һ������{x, y}
function getPosition(element) {
    var x = 0;
    var y = 0;
    var current = element;
    var pre = null;

    while (current !== null) {
        x += current.offsetLeft;
        y += current.offsetTop;
        pre = current;
        current = current.offsetParent;
    }

    return {x: x, y: y};
}


// mini selector
function $(selector) {
    return document.querySelector(selector);
}



/**
 * �ж��Ƿ�Ϊ�����ַ
 *
 * @param  {string}  emailStr Ŀ���ַ���
 * @return {boolean}          ���
 */
function isEmail(emailStr) {
    return /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/.test(emailStr);
}

// console.log(isEmail('lj.meng@s.baidu.com'))


/**
 * �ж��Ƿ�Ϊ�ֻ���
 * ���ж� ������ (+86) 185 xxxx xxxx
 *
 * @param  {string}  phone Ŀ���ַ���
 * @return {boolean}          ���
 */
function isMobilePhone(phone) {
    return /^1\d{10}$/.test(phone);
}

// console.log(isMobilePhone('18512341234'))





// ------------------------------------------------------------------
// �ж�IE�汾�ţ�����-1���߰汾��
// ------------------------------------------------------------------

// ����Ҫ˵�����ǣ������ж�������汾�ķ������������л����¶���ȷ��navigator�µ��ֶ����ױ�����۸ġ�
// ������ʵ�ʳ����£�������ܵĻ�������ʹ�û�ȡIE�汾�ŵķ�ʽ���������⣬
// ���Ƽ�����ֱ���ж���������ԣ�http://modernizr.com/�����Ǵ�������汾���֡�

// ���Ǵ�ͳ��userAgent + documentMode��ʽ��ie�汾�жϡ�
// ���ڴ��������IE�������hack�ĳ�������Ч����
function isIE() {
    return /msie (\d+\.\d+)/i.test(navigator.userAgent)
        ? (document.documentMode || + RegExp['\x241']) : undefined;
}





// ------------------------------------------------------------------
// ����cookie
// ------------------------------------------------------------------


function isValidCookieName(cookieName) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string

    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>

    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
        .test(cookieName);
}

function setCookie(cookieName, cookieValue, expiredays) {
    if (!isValidCookieName(cookieName)) {
        return;
    }

    var expires;
    if (expiredays != null) {
        expires = new Date();
        expires.setTime(expires.getTime() + expiredays * 24 * 60 * 60 * 1000);
    }

    document.cookie =
        cookieName + '=' + encodeURIComponent(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '');
}

function getCookie(cookieName) {
    if (isValidCookieName(cookieName)) {
        var reg = new RegExp('(^| )' + cookieName + '=([^;]*)(;|\x24)');
        var result = reg.exec(document.cookie);

        if (result) {
            return result[2] || null;
        }
    }

    return null;
}




// ------------------------------------------------------------------
// Ajax
// ------------------------------------------------------------------

/**
 * @param {string} url ���������url
 * @param {Object} options ���������ѡ�����
 * @config {string} [options.type] �����͵����͡�Ĭ��ΪGET��
 * @config {Object} [options.data] ��Ҫ���͵����ݡ�
 * @config {Function} [options.onsuccess] ����ɹ�ʱ������function(XMLHttpRequest xhr, string responseText)��
 * @config {Function} [options.onfail] ����ʧ��ʱ������function(XMLHttpRequest xhr)��
 *
 * @returns {XMLHttpRequest} ���������XMLHttpRequest����
 */
function ajax(url, options) {
    var options = options || {};
    var data = stringifyData(options.data || {});
    var type = (options.type || 'GET').toUpperCase();
    var xhr;
    var eventHandlers = {
        onsuccess: options.onsuccess,
        onfail: options.onfail
    };

    try {
        if (type === 'GET' && data) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
            data = null;
        }

        xhr = getXHR();
        xhr.open(type, url, true);
        xhr.onreadystatechange = stateChangeHandler;

        // ��open֮���ٽ���http����ͷ�趨
        if (type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    }
    catch (ex) {
        fire('fail');
    }

    return xhr;

    function stringifyData(data) {
        // �˷���ֻ�Ǽ�ʾ����ʵ�֣���δ��������������
        var param = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                param.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        return param.join('&');
    }

    function stateChangeHandler() {
        var stat;
        if (xhr.readyState === 4) {
            try {
                stat = xhr.status;
            }
            catch (ex) {
                // ������ʱ����������жϣ�Firefox���޷�ȡ��status
                fire('fail');
                return;
            }

            fire(stat);

            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable

            // IE error sometimes returns 1223 when it
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat === 304
                || stat === 1223) {
                fire('success');
            }
            else {
                fire('fail');
            }

            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             *
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             *
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    xhr.onreadystatechange = new Function();
                    xhr = null;
                },
                0
            );
        }
    }

    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type];

        if (!handler) {
            return;
        }
        if (type !== 'onsuccess') {
            handler(xhr);
        }
        else {
            //�����ȡxhr.responseText���³�������,��������ͼƬ��ַ.
            try {
                xhr.responseText;
            }
            catch(error) {
                return handler(xhr);
            }
            handler(xhr, xhr.responseText);
        }
    }
}