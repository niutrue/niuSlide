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