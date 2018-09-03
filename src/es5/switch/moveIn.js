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