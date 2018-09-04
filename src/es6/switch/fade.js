import {setStyle} from '../util/util.js';
import {stageState,backState} from '../logic/baseState.js';

export const fade = {};

fade.attrMap = {
    rightAttr:{
        opacity:0
    },
    stageAttr:{
        opacity:1
    },
    leftAttr:{
        opacity:0
    },
    readyAttr:{
        opacity:1
    }
}

//渐变的初始状态，测试用的
fade.ready = function(node,attr){

}

fade.run = function(node,attr){
    var style = Object.assign({},attr,{transition:'opacity 0.5s linear'})
    setStyle(node,style);
}
