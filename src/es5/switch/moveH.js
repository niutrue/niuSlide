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