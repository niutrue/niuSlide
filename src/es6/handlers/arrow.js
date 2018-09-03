import {moveIn} from '../switch/moveIn.js';
import {moveOut} from '../switch/moveOut.js';
import {findNode} from '../logic/findNode.js';

export function arrow (o){
    console.log('dasdddsdas')

    return
    var negBtn = o.negElement;
    var posBtn = o.posElement;
    posBtn.addEventListener('click',function(){//先退场，然后进场
        findNode(o);//确定舞台node和后台node
        //一个出场
        var stageNode = o.stageNode;
        stageNode.targetSlide = o;
        moveOut(stageNode);
        //一个退场
        var backNode = o.backNode;
        backNode.targetSlide = o;
        moveIn(backNode);
    },false);
    negBtn.addEventListener('click',function(){
        console.log('dada');
    },false);
}
