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
        left:0
    }
}

//渐变的初始状态，测试用的
fade.ready = function(){

}

fade.run = function(node){

}
