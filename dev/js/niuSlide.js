(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _loadImage = require('./util/loadImage.js');

var _util = require('./util/util.js');

var _proHandlers = require('./handlers/proHandlers.js');

var _createStageNodes = require('./logic/createStageNodes.js');

var _createItemNodes = require('./logic/createItemNodes.js');

var _updateStage = require('./logic/updateStage.js');

var arr1 = ['http://exploringjs.com/es2018-es2019/img/cover-homepage.jpg', 'http://speakingjs.com/es5/orm_front_cover.jpg', 'http://exploringjs.com/impatient-js/img/cover-homepage.jpg', 'http://exploringjs.com/es6/images/cover.jpg', 'http://exploringjs.com/es2016-es2017/images/cover.jpg'];

class NiuSlide {
    constructor(container, opt) {
        console.log(opt);
        //初始化属性
        this.pageArr = opt.pageArr; //装有图片的数组
        this.pageNum = opt.pageArr.length; //页面的数目
        this.curIndex = 0; //当前显示的页码
        this.nextIndex = 1; //接下来要显示的页码
        this.pageMode = 'pos'; //换页模式，正向，负向
        this.stageNode = null; //舞台上的node要退场
        this.nextNode = null; //一个准备node
        this.prevNode = null; //另一个准备node
        this.posEffect = opt.posEffect; //正向进场退场效果名称
        this.negEffect = opt.negEffect; //负向进场退场效果名称
        this.handlers = opt.handlers; //传进来的事件类型（交互类型）
        //之后还有可能多种，其实这是入场特效可能性的数量，transition限制的
        //node操作
        if (typeof container === 'string') {
            this.containerElement = document.querySelector(container);
        } else {
            this.containerElement = container; //挂载元素
        }
        //创建并且获取轮播图节点
        (0, _createStageNodes.createStageNodes)(this);
        (0, _createItemNodes.createItemNodes)(this);
        (0, _proHandlers.proHandlers)(this);
        (0, _updateStage.updateStage)(this);
    }
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
    handlers: ['arrow', 'slide'], //字符串对象
    posEffect: {
        enter: 'moveH', //字符串，对象
        leave: 'fade'
    },
    negEffect: {
        enter: 'fade',
        leave: 'moveH'
    }
});
console.log(ns1);
},{"./handlers/proHandlers.js":3,"./logic/createItemNodes.js":6,"./logic/createStageNodes.js":7,"./logic/updateStage.js":9,"./util/loadImage.js":15,"./util/util.js":16}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.arrow = arrow;

var _moveIn = require('../switch/moveIn.js');

var _moveOut = require('../switch/moveOut.js');

var _findNode = require('../logic/findNode.js');

function arrow(o) {
    console.log('dasdddsdas');

    return;
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
},{"../logic/findNode.js":8,"../switch/moveIn.js":12,"../switch/moveOut.js":13}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.proHandlers = proHandlers;

var _arrow = require('./arrow.js');

var handlersMap = {
    'arrow': _arrow.arrow
};

function proHandlers(o) {
    var handlers = [];
    if (o.handlers && o.handlers.length) {
        handlers = o.handlers;
        for (let i = 0; i < handlers.length; i++) {
            let proHandler = handlersMap[handlers[i]];
            if (proHandler) {
                proHandler(o);
            }
        }
    }
}
},{"./arrow.js":2}],4:[function(require,module,exports){
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
},{"../util/util.js":16,"./changePageIndex.js":5}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createItemNodes = createItemNodes;

var _util = require('../util/util.js');

//创建项目元素的模式 和 转场效果 对应映射
//可是 退场和入场有可能是两种动画效果
//一种动效，是一种模型，需要一种配置
//moveIn有两个方向，是改变left，初始需要3个dom，一个是舞台状态，两个是准备状态。
//之前是dom的移除和添加，现在是dom的属性改变
//舞台状态的元素下一阶段就是准备状态
//进场准备状态   进场舞台状态  设置退场相关属性(开始)
//退场准备状态  退场结束状态  --> 进场准备状态 设置进场相关属性(结束)
//动态效果函数需要相互访问，搞一个总的字典好了
//看来一个模块还是写成对象比较好，因为只要以复杂就需要把函数改成对象啊！！！\
//因为两个方向的缓动，其实是两种缓动，transition属性需要三个dom。只考虑一种场景倒是很简单的。
//就是再舞台上表演的元素有多少个
var modeMap = { //键值可以反过来的
    3: ['fade', 'moveH']
    //数组种是否包含某项
};function getMode(arr) {
    var modeArr = [];
    for (let key in modeMap) {
        for (let i = 0; i < modeMap[key].length; i++) {
            let item = modeMap[key][i];
            for (let i = 0; i < arr.length; i++) {
                if (item === arr[i]) {
                    modeArr.push(Number(key));
                }
            }
        }
    }
    return modeArr[0];
}

function createItemNodes(o) {
    var effArr = [];
    var pe = o.posEffect;
    if (typeof pe != undefined) {
        effArr.push(pe.enter);
        effArr.push(pe.leave);
    }
    var ne = o.negEffect;
    if (typeof pe != undefined) {
        effArr.push(ne.enter);
        effArr.push(ne.leave);
    }
    var mode = getMode(effArr);
    //创建动效相关的node，需要用到动效相关状态配置,不需要，事件绑定的时候，进行表演元素状态初始化
    if (mode === 3) {
        for (let i = 0; i < mode; i++) {
            o[`item${i}Element`] = (0, _util.div)('ns_item', `item${i}`);
            o.stageElement.append(o[`item${i}Element`]);
        }
    }
}

//
},{"../util/util.js":16}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStageNodes = createStageNodes;

var _util = require('../util/util.js');

function createStageNodes(o) {
    o.boxElement = (0, _util.div)('ns_box');
    o.stageElement = (0, _util.div)('ns_stage');
    // o.item1Element = div('ns_item ns_item_cur','item1');
    // setStyle(o.item1Element,{//一个元素是舞台状态
    //     left:'0px',
    //     top:'0px',
    //     backgroundImage:`url(${o.pageArr[o.curIndex]})`
    // })
    // o.item2Element = div('ns_item ns_item_next','item2');
    // setStyle(o.item2Element,{//一个元素是台前状态
    //     left:'200%',
    //     top:'200%',
    //     transition:'left 0 linear',
    //     backgroundImage:`url(${o.pageArr[o.nextIndex]})`
    // })
    o.controlElement = (0, _util.div)('ns_control');
    o.negElement = (0, _util.btn)('ns_neg');
    o.posElement = (0, _util.btn)('ns_pos');
    o.boxElement.append(o.stageElement);
    o.boxElement.append(o.controlElement);
    o.controlElement.append(o.posElement);
    o.controlElement.append(o.negElement);
    //this.containerElement.append(this.boxElement);
} //创建舞台相关节点
},{"../util/util.js":16}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateStage = updateStage;

var _switch = require('../switch/switch.js');

console.log(_switch.swMap);

//更新舞台表演元素的状态，为下一次专场效果做准备
function updateStage(o) {
    //正向入场特效，nextNode的初始状态
    //反向入场特效，prevNode的初始状态
    //双向离场特效，决定stageNode的初始状态

}
},{"../switch/switch.js":14}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fade = undefined;

var _util = require('../util/util.js');

var _baseState = require('../logic/baseState.js');

const fade = exports.fade = {};

fade.attrMap = {
    rightAttr: {
        opacity: 0
    },
    stageAttr: {
        opacity: 1
    },
    leftAttr: {
        left: 0
    }

    //渐变的初始状态，测试用的
};fade.ready = function () {};

fade.run = function (node) {};
},{"../logic/baseState.js":4,"../util/util.js":16}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveH = undefined;

var _util = require('../util/util.js');

var _baseState = require('../logic/baseState.js');

const moveH = exports.moveH = {};

moveH.attrMap = {
    rightAttr: {
        left: '100%'
    },
    stageAttr: {
        left: '0px'
    },
    leftAttr: {
        left: '-100%'
    }

    //渐变的初始状态，测试用的
};moveH.ready = function () {};

moveH.run = function (node) {};
},{"../logic/baseState.js":4,"../util/util.js":16}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveIn = undefined;

var _util = require('../util/util.js');

var _baseState = require('../logic/baseState.js');

//动态效果的执行函数  加  配置
//就是元素的各种状态 和 在状态之间的切换
//准备状态，表演状态，表演结束之后的整理状态
var moveIn = exports.moveIn = {};

moveIn.run = function (node) {
    ready(node);
    play(node);
};

//元素各种状态样式集
moveIn.attrMap = {
    readyAttr: { //元素状态1
        left: '100%'
    },
    playAttr: { //元素状态2
        left: '0px'
    }

    //准备状态
};function ready(node) {}
//表演状态
function play(node) {
    //这个延时还可以搞搞，延时使用css属性
    //在这里使用渐变
    var style = attrMap.playAttr;
    node.style.transition = 'left 0.5s linear';
    (0, _util.setStyle)(node, style);
    node.addEventListener('transitionend', tide, false);
}
//整理状态  渐变结束，取消渐变去做准备
function tide(e) {
    var node = e.target;
    var o = node.targetSlide;
    node.removeEventListener('transitionend', tide, false);
    node.style.transition = ''; //取消渐变
    (0, _baseState.stageState)(o);
}
},{"../logic/baseState.js":4,"../util/util.js":16}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveOut = undefined;

var _util = require('../util/util.js');

var _baseState = require('../logic/baseState.js');

var moveOut = exports.moveOut = {};

moveOut.run = function () {
    ready(node);
    play(node);
};

moveOut.attrMap = {
    readyAttr: {},
    playAttr: {}

    //准备状态  这个准备好了
};function ready(node) {}
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
},{"../logic/baseState.js":4,"../util/util.js":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.swMap = undefined;

var _moveH = require('./moveH.js');

var _fade = require('./fade.js');

const swMap = exports.swMap = {
    moveH: _moveH.moveH,
    fade: _fade.fade
};
},{"./fade.js":10,"./moveH.js":11}],15:[function(require,module,exports){
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
},{"./util.js":16}],16:[function(require,module,exports){
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