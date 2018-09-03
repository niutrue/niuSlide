import {setStyle} from '../util/util.js';
import {stageState,backState} from '../logic/baseState.js';

export var moveOut = {};

moveOut.run = function(){
    ready(node);
    play(node);
}

moveOut.attrMap = {
    readyAttr:{

    },
    playAttr:{
        
    }
}

//准备状态  这个准备好了
function ready(node){

}
//表演状态
function play(node){//这个延时还可以搞搞
    var style = {
        transition:'left 0.5s linear',
        left:'-100%'
    }
    setStyle(node,style);
    node.addEventListener('transitionend',tide,false);
}
//整理状态
function tide(e){
    var node = e.target;
    var o = node.targetSlide;
    node.removeEventListener('transitionend',tide,false);
    node.style.transition='';
    backState(o);
}
