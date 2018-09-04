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