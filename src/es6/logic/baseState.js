import {changePageIndex} from './changePageIndex.js';
import {setStyle} from '../util/util.js';

//改变元素在逻辑上的状态  这个和页码切换的模式有关  正向负向
//node进场模式要改成舞台状态
export function stageState(o){
    var node = o.backNode;
    node.classList.remove('ns_item_next');//不能链式操作
    node.classList.add('ns_item_cur');
}
//node退场效果要进入后台模式
export function backState(o){
    //该变这个节点的状态。做一些准备工作
    //更新当前的页面，取更新后的当前页
    var node = o.stageNode;
    node.classList.remove('ns_item_cur');
    node.classList.add('ns_item_next');
    changePageIndex(o);
    var style = {
        left:'100%',
        top:'0px',
        backgroundImage:`url(${o.pageArr[o.nextIndex]})`
    }
    setStyle(node,style);
}
