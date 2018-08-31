//准备状态，表演状态，表演结束之后的整理状态
import {setStyle} from '../util/util.js';
import {stageState,backState} from '../logic/baseState.js';
//这里要的就是一个node。node什么变化效果这里说了算
export function moveIn(node){
    ready(node);
    play(node);
}

//准备状态
function ready(node){
    setStyle(node,{//一个元素是台前状态
        left:'100%',
        top:'0px'
    })
}
//表演状态
function play(node){//这个延时还可以搞搞

    var style = {
        transition:'left 0.5s linear',
        left:'0px'
    }
    setStyle(node,style);
    node.addEventListener('transitionend',tide,false);
}
//整理状态
function tide(e){
    var node = e.target;
    var o = node.targetSlide;
    node.removeEventListener('transitionend',tide,false);
    node.style.transition='';//取消渐变
    stageState(o);
}
