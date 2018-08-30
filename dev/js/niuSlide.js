(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _loadImage = require('./util/loadImage.js');

var _util = require('./util/util.js');

var arr1 = ['http://speakingjs.com/es5/orm_front_cover.jpg', 'http://exploringjs.com/impatient-js/img/cover-homepage.jpg', 'http://exploringjs.com/es6/images/cover.jpg', 'http://exploringjs.com/es2016-es2017/images/cover.jpg', 'http://exploringjs.com/es2018-es2019/img/cover-homepage.jpg'];

var lm = new _loadImage.LoadImage('lm');
window.addEventListener('lmFirstImageLoad', function () {
    console.log('第一张加载完毕');
}, false);

class NiuSlide {
    constructor(container, obj) {
        if (typeof container === 'string') {
            this.containerElement = document.querySelector(container);
        } else {
            this.containerElement = container; //挂载元素
        }
        this.pageArr = obj.pageArr; //拥有图片的数组
        //创建并且获取轮播图节点
        this.createNodes();
    }

    createNodes() {
        this.boxElement = (0, _util.div)('ns_box');
        this.stageElement = (0, _util.div)('ns_stage');
        this.item1Element = (0, _util.div)('ns_item ns_item_show ns_item_cur', 'item1');
        this.item2Element = (0, _util.div)('ns_item ns_item_hidden ns_item_next', 'item2');
        this.controlElement = (0, _util.div)('ns_control');
        this.negElement = (0, _util.btn)('ns_neg');
        this.posElement = (0, _util.btn)('ns_pos');
        this.boxElement.append(this.stageElement);
        this.boxElement.append(this.controlElement);
        this.stageElement.append(this.item1Element);
        this.stageElement.append(this.item2Element);
        this.controlElement.append(this.negElement);
        this.controlElement.append(this.posElement);
        this.containerElement.append(this.boxElement);
    }
    //将数组加功成自己需要的格式
    static foamatArr() {}
}

var ns1 = new NiuSlide('.niu', {
    pageArr: arr1
});
console.log(ns1);
},{"./util/loadImage.js":2,"./util/util.js":3}],2:[function(require,module,exports){
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
},{"./util.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEvent = createEvent;
exports.div = div;
exports.btn = btn;
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
},{}]},{},[1])