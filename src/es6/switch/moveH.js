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
    }
}

//渐变的初始状态，测试用的
moveH.ready = function(){

}

moveH.run = function(node){

}
