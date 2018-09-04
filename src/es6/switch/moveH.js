import {setStyle} from '../util/util.js';
import {stageState,backState} from '../logic/baseState.js';

export const moveH = {};

moveH.attrMap = {
    rightAttr:{
        left:'100%'
    },
    stageAttr:{
        left:'0px'
    },
    leftAttr:{
        left:'-100%'
    },
    readyAttr:{
        left:'0px'
    }
}

//渐变的初始状态，测试用的
moveH.ready = function(node,attr){

}

moveH.run = function(node,attr){
    var style = Object.assign({},attr,{transition:'left 0.5s linear'})
    setStyle(node,style);
}









//
