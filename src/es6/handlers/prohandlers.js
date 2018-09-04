import {arrow} from './arrow.js';

import {swMap} from '../switch/switch.js';
import {updateReadyNode,updatePlayNode} from '../logic/updateStage.js';
//绑定参数传过来的事件
var handlersMap = {
    'arrow':arrow
}
//需要把事件跟特效绑定啊  事件和动效的各种状态类型

export function proHandlers(o){
    getEff(o);
    afterSw(o);
    var handlers = [];
    if(o.handlers&&o.handlers.length){
        handlers = o.handlers;
        for(let i = 0;i < handlers.length; i++){
            let proHandler = handlersMap[handlers[i]];
            if(proHandler){
                proHandler(o);
            }
        }
    }
}

function getEff(o){
    var eff = {
        pe:{},
        pl:{},
        ne:{},
        nl:{}
    }
    var pe = o.posEffect;
    var ne = o.negEffect;
    var peIn = pe.enter;
    var peOut = pe.leave;
    var neIn = ne.enter;
    var neOut = ne.leave;
    eff.pe.attr = swMap[peIn].attrMap.stageAttr;
    eff.pe.run = swMap[peIn].run;
    eff.pl.attr = swMap[peOut].attrMap.leftAttr;
    eff.pl.run = swMap[peOut].run;
    eff.ne.attr = swMap[neIn].attrMap.stageAttr;
    eff.ne.run = swMap[neIn].run;
    eff.nl.attr = swMap[neOut].attrMap.rightAttr;
    eff.nl.run = swMap[neOut].run;
    o.eff = eff;//存在o上
}

//渐变完成的那个放这好了，使用事件代理
function afterSw(o){
    o.stageElement.addEventListener('transitionend',function(e){
        var node = e.target;
        if(node.classList.contains('item_cur')){//退场完成
            //正向的，所以，正向准备node缺失了。退场元素补缺
            o.tempNode = node;
            updateReadyNode(o);
        } else {//进场完场
            o.tempNode = node;
            updatePlayNode(o);
        }
    },false);
}






















//
