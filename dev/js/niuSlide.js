(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _loadImage = require('./util/loadImage.js');

var _util = require('./util/util.js');

var _arrow = require('./handlers/arrow.js');

var arr1 = ['http://exploringjs.com/es2018-es2019/img/cover-homepage.jpg', 'http://speakingjs.com/es5/orm_front_cover.jpg', 'http://exploringjs.com/impatient-js/img/cover-homepage.jpg', 'http://exploringjs.com/es6/images/cover.jpg', 'http://exploringjs.com/es2016-es2017/images/cover.jpg'];

class NiuSlide {
    constructor(container, obj) {
        if (typeof container === 'string') {
            this.containerElement = document.querySelector(container);
        } else {
            this.containerElement = container; //挂载元素
        }
        this.pageArr = obj.pageArr; //拥有图片的数组
        this.pageNum = obj.pageArr.length; //页面的数目
        this.curIndex = 0; //当前显示的页码
        this.nextIndex = 1; //接下来要显示的页码
        this.pageMode = 'pos'; //换页模式，正向，负向
        this.stageNode = null; //舞台上的node要退场
        this.backNode = null; //后台的node要进场
        //创建并且获取轮播图节点
        this.createNodes();
        (0, _arrow.arrow)(this); //这里应该是可配置的
    }
    //创建并且现实dom,完成初始化,初始化，一个台前，一个幕后
    createNodes() {
        //这是基本node。舞台上的元素，可以拆开，跟着特效走
        this.boxElement = (0, _util.div)('ns_box');
        this.stageElement = (0, _util.div)('ns_stage');
        this.item1Element = (0, _util.div)('ns_item ns_item_cur', 'item1');
        (0, _util.setStyle)(this.item1Element, { //一个元素是舞台状态
            left: '0px',
            top: '0px',
            backgroundImage: `url(${this.pageArr[this.curIndex]})`
        });
        this.item2Element = (0, _util.div)('ns_item ns_item_next', 'item2');
        (0, _util.setStyle)(this.item2Element, { //一个元素是台前状态
            left: '200%',
            top: '200%',
            transition: 'left 0 linear',
            backgroundImage: `url(${this.pageArr[this.nextIndex]})`
        });
        this.controlElement = (0, _util.div)('ns_control');
        this.negElement = (0, _util.btn)('ns_neg');
        this.posElement = (0, _util.btn)('ns_pos');
        this.boxElement.append(this.stageElement);
        this.boxElement.append(this.controlElement);
        this.stageElement.append(this.item1Element);
        this.stageElement.append(this.item2Element);
        this.controlElement.append(this.posElement);
        this.controlElement.append(this.negElement);
        //this.containerElement.append(this.boxElement);
    }
    //将初始化好的Node结构放页面中
    render() {
        this.containerElement.append(this.boxElement);
    }
    //将数组加功成自己需要的格式
    static foamatArr() {}
}

var lm = new _loadImage.LoadImage('lm');
lm.loadImages(arr1);
window.addEventListener('lmFirstImageLoad', function () {
    ns1.render(); //这样经常可以访问到。变量提升加异步访问可以
}, false);

var ns1 = new NiuSlide('.niu', {
    pageArr: arr1,
    handlers: ['arrow', 'slide'],
    slideIn: 'moveIn',
    slideOut: 'moveOut'
});
console.log(ns1);
},{"./handlers/arrow.js":2,"./util/loadImage.js":8,"./util/util.js":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.arrow = arrow;

var _moveIn = require('../switch/moveIn.js');

var _moveOut = require('../switch/moveOut.js');

var _findNode = require('../logic/findNode.js');

function arrow(o) {
    var negBtn = o.negElement;
    var posBtn = o.posElement;
    posBtn.addEventListener('click', function () {
        //先退场，然后进场
        (0, _findNode.findNode)(o); //确定舞台node和后台node
        //一个出场
        var stageNode = o.stageNode;
        stageNode.targetSlide = o;
        (0, _moveOut.moveOut)(stageNode);
        //一个退场
        var backNode = o.backNode;
        backNode.targetSlide = o;
        (0, _moveIn.moveIn)(backNode);
    }, false);
    negBtn.addEventListener('click', function () {
        console.log('dada');
    }, false);
}
},{"../logic/findNode.js":5,"../switch/moveIn.js":6,"../switch/moveOut.js":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stageState = stageState;
exports.backState = backState;

var _changePageIndex = require('./changePageIndex.js');

var _util = require('../util/util.js');

//改变元素在逻辑上的状态  这个和页码切换的模式有关  正向负向
//node进场模式要改成舞台状态
function stageState(o) {
    var node = o.backNode;
    node.classList.remove('ns_item_next'); //不能链式操作
    node.classList.add('ns_item_cur');
}
//node退场效果要进入后台模式
function backState(o) {
    //该变这个节点的状态。做一些准备工作
    //更新当前的页面，取更新后的当前页
    var node = o.stageNode;
    node.classList.remove('ns_item_cur');
    node.classList.add('ns_item_next');
    (0, _changePageIndex.changePageIndex)(o);
    var style = {
        left: '100%',
        top: '0px',
        backgroundImage: `url(${o.pageArr[o.nextIndex]})`
    };
    (0, _util.setStyle)(node, style);
}
},{"../util/util.js":9,"./changePageIndex.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changePageIndex = changePageIndex;
exports.calIndex = calIndex;
//跟页面方向有关 pageDir

function changePageIndex(o) {
    if (o.pageMode === 'pos') {
        //现在我又不想这样写了，想写简单些
        o.curIndex++;
    } else if (pageDir === 'neg') {
        o.curIndex--;
    }
    calIndex(o);
}
//大小无限的数字，向一段固定长度数字序列转化
function calIndex(o) {
    o.curIndex = transNum(o.curIndex);
    o.nextIndex = transNum(o.curIndex + 1);
    o.prevIndex = transNum(o.curIndex - 1);
}
function transNum(num) {
    num = num % length;
    if (num < 0) {
        num = num + length;
    }
}
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findNode = findNode;
//找到舞台上的节点和幕后的节点
function findNode(o) {

    if (o.item1Element.classList.contains('ns_item_cur')) {
        o.stageNode = o.item1Element;
        o.backNode = o.item2Element;
    } else {
        o.stageNode = o.item2Element;
        o.backNode = o.item1Element;
    }
}
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveIn = moveIn;

var _util = require('../util/util.js');

var _baseState = require('../logic/baseState.js');

//这里要的就是一个node。node什么变化效果这里说了算
//准备状态，表演状态，表演结束之后的整理状态
function moveIn(node) {
    ready(node);
    play(node);
}

//准备状态
function ready(node) {
    (0, _util.setStyle)(node, { //一个元素是台前状态
        left: '100%',
        top: '0px'
    });
}
//表演状态
function play(node) {
    //这个延时还可以搞搞

    var style = {
        transition: 'left 0.5s linear',
        left: '0px'
    };
    (0, _util.setStyle)(node, style);
    node.addEventListener('transitionend', tide, false);
}
//整理状态
function tide(e) {
    var node = e.target;
    var o = node.targetSlide;
    node.removeEventListener('transitionend', tide, false);
    node.style.transition = ''; //取消渐变
    (0, _baseState.stageState)(o);
}
},{"../logic/baseState.js":3,"../util/util.js":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveOut = moveOut;

var _util = require('../util/util.js');

var _baseState = require('../logic/baseState.js');

function moveOut(node) {
    ready(node);
    play(node);
}

//准备状态  这个准备好了
function ready(node) {}
//表演状态
function play(node) {
    //这个延时还可以搞搞
    var style = {
        transition: 'left 0.5s linear',
        left: '-100%'
    };
    (0, _util.setStyle)(node, style);
    node.addEventListener('transitionend', tide, false);
}
//整理状态
function tide(e) {
    var node = e.target;
    var o = node.targetSlide;
    node.removeEventListener('transitionend', tide, false);
    node.style.transition = '';
    (0, _baseState.backState)(o);
}
},{"../logic/baseState.js":3,"../util/util.js":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadImage = undefined;

var _util = require('./util.js');

class LoadImage {
    constructor(name) {
        this.name = name || ''; //这个实例的名字，作为自定义事件的前缀
        this.loadStatus = {};
        this.totalNum = 0;
        this.completeNum = 0;
    }
    //加载一个图片
    loadImage(url, index) {
        var that = this;
        let img = new Image();
        img.src = url;
        img.onload = function () {
            if (index != undefined) {
                that.loadStatus[index] = 'success';
                if (index == 0) {
                    window.dispatchEvent((0, _util.createEvent)(`${that.name}FirstImageLoad`));
                }
                that.loadComplete();
            }
        };
        img.onerror = function () {
            if (index != undefined) {
                that.loadStatus[index] = 'error';
                that.loadComplete();
            }
        };
    }
    //加载多个图片
    loadImages(arr) {
        this.totalNum = arr.length;
        if (!arr.length) {
            return;
        };
        for (let i = 0; i < arr.length; i++) {
            this.loadImage(arr[i], i);
        }
    }
    //全部加载完成
    loadComplete() {
        this.completeNum++;
        if (this.completeNum === this.totalNum) {
            window.dispatchEvent((0, _util.createEvent)(`${this.name}AllImagesLoad`));
        }
    }
}
exports.LoadImage = LoadImage; //全部加载有事件
//第一个加载成功有事件
//其他图片是否加载完，查状态吧
//我需要自定义事件
},{"./util.js":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEvent = createEvent;
exports.div = div;
exports.btn = btn;
exports.setStyle = setStyle;
//创建自定义事件
function createEvent(name) {
    return new CustomEvent(name);
}
//创建div节点
function div(className, id) {
    var node = document.createElement('div');
    if (className) {
        node.className = className;
    }
    if (id) {
        node.id = id;
    }
    return node;
}
//创建button
function btn(className, id) {
    var node = document.createElement('button');
    if (className) {
        node.className = className;
    }
    if (id) {
        node.id = id;
    }
    return node;
}
//给元素设置样式
function setStyle(ele, style) {
    for (var key in style) {
        ele.style[key] = style[key];
    }
}

//
},{}]},{},[1])