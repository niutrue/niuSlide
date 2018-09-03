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