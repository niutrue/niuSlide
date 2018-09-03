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