(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _loadImage = require('./util/loadImage.js');

var _util = require('./util/util.js');

var _proHandlers = require('./handlers/proHandlers.js');

var _createStageNodes = require('./logic/createStageNodes.js');

var _createItemNodes = require('./logic/createItemNodes.js');

var _updateStage = require('./logic/updateStage.js');

var arr1 = ['http://img.xixik.net/custom/section/12shengxiao/xixik-7ac6f5088a2dc1ba.png', 'http://img.xixik.net/custom/section/12shengxiao/xixik-e65e17907ef66f21.png', 'http://img.xixik.net/custom/section/12shengxiao/xixik-32cd22cd24e8e611.png', 'http://img.xixik.net/custom/section/12shengxiao/xixik-e7a4df1e008f407f.png', 'http://img.xixik.net/custom/section/12shengxiao/xixik-adadd997595142e9.png', 'http://img.xixik.net/custom/section/12shengxiao/xixik-ce2ee26653bbab4d.png'];

class NiuSlide {
    constructor(container, opt) {
        console.log(opt);
        //初始化属性
        this.pageArr = opt.pageArr; //装有图片的数组
        this.pageNum = opt.pageArr.length; //页面的数目
        this.curIndex = 0; //当前显示的页码
        this.nextIndex = 0; //正向接下来要显示的页码
        this.prevIndex = 0; //反向接下来要显示的页码
        this.pageMode = 'init'; //换页模式，正向，负向   init pos neg
        this.stageNode = null; //舞台上的node要退场
        this.nextNode = null; //一个准备node
        this.prevNode = null; //另一个准备node
        this.posEffect = opt.posEffect; //正向进场退场效果名称
        this.negEffect = opt.negEffect; //负向进场退场效果名称
        this.handlers = opt.handlers; //传进来的事件类型（交互类型）
        this.enterSign = false; //是否进场成功
        this.leaveSign = false; //是否退场成功
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
        (0, _updateStage.updateStage)(this);
        (0, _proHandlers.proHandlers)(this);
    }
    render() {
        this.containerElement.append(this.boxElement);
    }
    //将数组加功成自己需要的格式
    static foamatArr() {}
}

// var lm = new LoadImage('lm');
// lm.loadImages(arr1);
// window.addEventListener('lmFirstImageLoad',function(){
//     ns1.render();//这样经常可以访问到。变量提升加异步访问可以
// },false);
//
// var ns1 = new NiuSlide('.niu',{
//     pageArr:arr1,
//     handlers:['arrow','slide'],//字符串对象
//     posEffect:{
//         enter:'moveH',//字符串，对象
//         leave:'fade'
//     },
//     negEffect:{
//         enter:'fade',
//         leave:'moveH'
//     }
// });
},{"./handlers/proHandlers.js":3,"./logic/createItemNodes.js":6,"./logic/createStageNodes.js":7,"./logic/updateStage.js":9,"./util/loadImage.js":15,"./util/util.js":16}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.arrow = arrow;

var _moveIn = require('../switch/moveIn.js');

var _moveOut = require('../switch/moveOut.js');

var _findNode = require('../logic/findNode.js');

//左右箭头点击按钮
//每个事件要确定 页面切换模式
function arrow(o) {
    var negBtn = o.negElement;
    var posBtn = o.posElement;
    var nodes = o.stageElement.childNodes; //这个会自动更新吗？
    //这个按钮就是要正向切换
    posBtn.addEventListener('click', function () {
        //先退场，然后进场
        o.pageMode = 'pos';
        var stageNode = (0, _findNode.findNode)(nodes, 'item_cur');
        stageNode.swDir = 'pos';
        var nextNode = (0, _findNode.findNode)(nodes, 'item_pr');
        nextNode.swDir = 'pos';
        var pl = o.eff.pl;
        var pe = o.eff.pe;
        pl.run(stageNode, pl.attr); //离场
        pe.run(nextNode, pe.attr); //进场
    }, false);
    //什么元素往什么方向使用什么特效(类型，属性值)
    negBtn.addEventListener('click', function () {
        o.pageMode = 'neg';
        var stageNode = (0, _findNode.findNode)(nodes, 'item_cur');
        stageNode.swDir = 'neg';
        var prevNode = (0, _findNode.findNode)(nodes, 'item_nr');
        prevNode.swDir = 'neg';
        var nl = o.eff.nl;
        var ne = o.eff.ne;
        nl.run(stageNode, nl.attr); //离场
        ne.run(prevNode, ne.attr); //进场
    }, false);
}
},{"../logic/findNode.js":8,"../switch/moveIn.js":12,"../switch/moveOut.js":13}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.proHandlers = proHandlers;

var _arrow = require('./arrow.js');

var _switch = require('../switch/switch.js');

var _updateStage = require('../logic/updateStage.js');

//绑定参数传过来的事件
var handlersMap = {
    'arrow': _arrow.arrow
    //需要把事件跟特效绑定啊  事件和动效的各种状态类型

};function proHandlers(o) {
    getEff(o);
    afterSw(o);
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

function getEff(o) {
    var eff = {
        pe: {},
        pl: {},
        ne: {},
        nl: {}
    };
    var pe = o.posEffect;
    var ne = o.negEffect;
    var peIn = pe.enter;
    var peOut = pe.leave;
    var neIn = ne.enter;
    var neOut = ne.leave;
    eff.pe.attr = _switch.swMap[peIn].attrMap.stageAttr;
    eff.pe.run = _switch.swMap[peIn].run;
    eff.pl.attr = _switch.swMap[peOut].attrMap.leftAttr;
    eff.pl.run = _switch.swMap[peOut].run;
    eff.ne.attr = _switch.swMap[neIn].attrMap.stageAttr;
    eff.ne.run = _switch.swMap[neIn].run;
    eff.nl.attr = _switch.swMap[neOut].attrMap.rightAttr;
    eff.nl.run = _switch.swMap[neOut].run;
    o.eff = eff; //存在o上
}

//渐变完成的那个放这好了，使用事件代理
function afterSw(o) {
    o.stageElement.addEventListener('transitionend', function (e) {
        var node = e.target;
        if (node.classList.contains('item_cur')) {
            //退场完成
            //正向的，所以，正向准备node缺失了。退场元素补缺
            o.tempNode = node;
            (0, _updateStage.updateReadyNode)(o);
        } else {
            //进场完场
            o.tempNode = node;
            (0, _updateStage.updatePlayNode)(o);
        }
    }, false);
}

//
},{"../logic/updateStage.js":9,"../switch/switch.js":14,"./arrow.js":2}],4:[function(require,module,exports){
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
var length;
function changePageIndex(o) {
    if (o.pageMode === 'pos') {
        //现在我又不想这样写了，想写简单些
        o.curIndex++;
    } else if (o.pageMode === 'neg') {
        o.curIndex--;
    }
    length = o.pageNum;
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
    return num;
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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findNode = findNode;
//找到舞台上的节点和各方向的节点
function findNode(list, cn) {
    var result = null;
    if (list.length) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains(cn)) {
                result = list[i];
            }
        }
    }
    return result;
}

//开始直接卡住!
function pauseSomeMinutes(min) {
    window.requestAnimationFrame(goEnd);
    var reStartTime = +new Date() + 1000 * 60 * min;
    for (var i = +new Date(); i < reStartTime; i++) {
        window.requestAnimationFrame(goEnd);
        i = +new Date();
    }
}

//pauseSomeMinutes(1);
var num = 0;
var s = window.requestAnimationFrame;
//s(goEnd);
//不堵塞。两个进程啊
function goEnd() {
    //这个是封装啊
    num++;
    console.log(num); //可以访问外界变量
    console.log(new Date().getSeconds());
    if (num == 20) {
        s = undefined;
    }
    if (s) {
        s(goEnd);
    }
}
//可以写多个，可以吗?
// window.requestAnimationFrame(goEnd);
//for和animation照样会卡
//callback里写条件呢？
//也可以赋值给变量
//https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateStage = updateStage;
exports.updateReadyNode = updateReadyNode;
exports.updatePlayNode = updatePlayNode;

var _switch = require('../switch/switch.js');

var _util = require('../util/util.js');

var _changePageIndex = require('../logic/changePageIndex.js');

var _findNode = require('./findNode.js');

//更新舞台表演元素的状态，为下一次专场效果做准备
function updateStage(o) {
    //正向入场特效类型和正向属性，nextNode的初始状态
    //反向入场特效，prevNode的初始状态
    //双向离场特效，决定stageNode的初始状态
    //使用 Object.assign的时候，不想改变原始对象，就这样
    (0, _changePageIndex.changePageIndex)(o);
    var pe = o.posEffect;
    var ne = o.negEffect;
    var nextInitAttr = _switch.swMap[pe.enter].attrMap.rightAttr;
    nextInitAttr = Object.assign({}, nextInitAttr, { backgroundImage: `url(${o.pageArr[o.nextIndex]})` });
    var prevInitAttr = _switch.swMap[ne.enter].attrMap.leftAttr;
    prevInitAttr = Object.assign({}, prevInitAttr, { backgroundImage: `url(${o.pageArr[o.prevIndex]})` });
    var neOutAttr = _switch.swMap[ne.leave].attrMap.stageAttr;
    var peOutAttr = _switch.swMap[pe.leave].attrMap.stageAttr;
    var curInitAttr = Object.assign({}, neOutAttr, peOutAttr, { backgroundImage: `url(${o.pageArr[o.curIndex]})` });

    var stageNodes = o.stageElement.childNodes;
    stageNodes[0].classList.add('item_nr');
    (0, _util.setStyle)(stageNodes[0], prevInitAttr);
    stageNodes[1].classList.add('item_cur');
    (0, _util.setStyle)(stageNodes[1], curInitAttr);
    stageNodes[2].classList.add('item_pr');
    (0, _util.setStyle)(stageNodes[2], nextInitAttr);
}
//离场成功之后，重新初始化准备元素
//入场成功之后，重新初始化舞台元素
//看来我需要知道入场node和出场node
function updateReadyNode(o) {
    o.leaveSign = true;
    updatePageIndex(o);
    var node = o.tempNode;
    var pe = o.posEffect;
    var ne = o.negEffect;
    if (node.swDir === 'pos') {
        var nextInitAttr = _switch.swMap[pe.enter].attrMap.rightAttr;
        var initAttr = _switch.swMap[pe.leave].attrMap.readyAttr; //同一种要被next覆盖
        //Object是不是 相同属性的话 后面的覆盖前面的
        nextInitAttr = Object.assign({}, initAttr, nextInitAttr, {
            backgroundImage: `url(${o.pageArr[o.nextIndex]})`,
            transition: ''
        });
        (0, _util.setStyle)(node, nextInitAttr);
        node.classList.remove('item_cur');
        node.classList.add('item_pr');
        //另一个准备dom
        var otherNode = (0, _findNode.findNode)(o.stageElement.childNodes, 'item_nr');
        otherNode.style.backgroundImage = `url(${o.pageArr[o.prevIndex]})`;
    } else if (node.swDir === 'neg') {
        var prevInitAttr = _switch.swMap[ne.enter].attrMap.leftAttr;
        var initAttr = _switch.swMap[ne.leave].attrMap.readyAttr;
        prevInitAttr = Object.assign({}, initAttr, prevInitAttr, {
            backgroundImage: `url(${o.pageArr[o.prevIndex]})`,
            transition: ''
        });
        (0, _util.setStyle)(node, prevInitAttr);
        node.classList.remove('item_cur');
        node.classList.add('item_nr');
        //另一个准备dom
        var otherNode = (0, _findNode.findNode)(o.stageElement.childNodes, 'item_pr');
        otherNode.style.backgroundImage = `url(${o.pageArr[o.nextIndex]})`;
    }
}

function updatePlayNode(o) {
    o.enterSign = true;
    updatePageIndex(o);
    var node = o.tempNode;
    var pe = o.posEffect;
    var ne = o.negEffect;
    var neOutAttr = _switch.swMap[ne.leave].attrMap.stageAttr;
    var peOutAttr = _switch.swMap[pe.leave].attrMap.stageAttr;
    var curInitAttr = Object.assign({}, neOutAttr, peOutAttr, {
        transition: ''
    });
    (0, _util.setStyle)(node, curInitAttr);
    node.classList.remove('item_pr');
    node.classList.remove('item_nr');
    node.classList.add('item_cur');
}

function updatePageIndex(o) {
    if (o.enterSign && o.leaveSign) {
        o.enterSign = false;
        o.leaveSign = false;
    } else {
        (0, _changePageIndex.changePageIndex)(o);
    }
}
//入场和离场都需要更新视图，但是呢，改变当前图片的索引，只能一个去执行
//入场先完成，离场后完成
//离场先完成，入场后完成
//更新索引当然是先完成了
},{"../logic/changePageIndex.js":5,"../switch/switch.js":14,"../util/util.js":16,"./findNode.js":8}],10:[function(require,module,exports){
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
        opacity: 0
    },
    readyAttr: {
        opacity: 1
    }

    //渐变的初始状态，测试用的
};fade.ready = function (node, attr) {};

fade.run = function (node, attr) {
    var style = Object.assign({}, attr, { transition: 'opacity 0.5s linear' });
    (0, _util.setStyle)(node, style);
};
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
    },
    readyAttr: {
        left: '0px'
    }

    //渐变的初始状态，测试用的
};moveH.ready = function (node, attr) {};

moveH.run = function (node, attr) {
    var style = Object.assign({}, attr, { transition: 'left 0.5s linear' });
    (0, _util.setStyle)(node, style);
};

//
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