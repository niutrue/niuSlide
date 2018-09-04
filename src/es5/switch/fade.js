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