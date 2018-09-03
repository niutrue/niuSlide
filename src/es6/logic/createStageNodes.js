//创建舞台相关节点
import {div,btn,setStyle} from '../util/util.js';

export function createStageNodes(o){
    o.boxElement = div('ns_box');
    o.stageElement = div('ns_stage');
    // o.item1Element = div('ns_item ns_item_cur','item1');
    // setStyle(o.item1Element,{//一个元素是舞台状态
    //     left:'0px',
    //     top:'0px',
    //     backgroundImage:`url(${o.pageArr[o.curIndex]})`
    // })
    // o.item2Element = div('ns_item ns_item_next','item2');
    // setStyle(o.item2Element,{//一个元素是台前状态
    //     left:'200%',
    //     top:'200%',
    //     transition:'left 0 linear',
    //     backgroundImage:`url(${o.pageArr[o.nextIndex]})`
    // })
    o.controlElement = div('ns_control');
    o.negElement = btn('ns_neg');
    o.posElement = btn('ns_pos');
    o.boxElement.append(o.stageElement);
    o.boxElement.append(o.controlElement);
    o.controlElement.append(o.posElement);
    o.controlElement.append(o.negElement);
    //this.containerElement.append(this.boxElement);
}
