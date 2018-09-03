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