import {moveIn} from '../switch/moveIn.js';
import {moveOut} from '../switch/moveOut.js';
import {findNode} from '../logic/findNode.js';
//左右箭头点击按钮
//每个事件要确定 页面切换模式
export function arrow (o){
    var negBtn = o.negElement;
    var posBtn = o.posElement;
    var nodes = o.stageElement.childNodes;//这个会自动更新吗？
    //这个按钮就是要正向切换
    posBtn.addEventListener('click',function(){//先退场，然后进场
        o.pageMode = 'pos';
        var stageNode = findNode(nodes,'item_cur');
        stageNode.swDir = 'pos';
        var nextNode = findNode(nodes,'item_pr');
        nextNode.swDir = 'pos';
        var pl = o.eff.pl;
        var pe = o.eff.pe;
        pl.run(stageNode,pl.attr);//离场
        pe.run(nextNode,pe.attr);//进场
    },false);
    //什么元素往什么方向使用什么特效(类型，属性值)
    negBtn.addEventListener('click',function(){
        o.pageMode = 'neg';
        var stageNode = findNode(nodes,'item_cur');
        stageNode.swDir = 'neg';
        var prevNode = findNode(nodes,'item_nr');
        prevNode.swDir = 'neg';
        var nl = o.eff.nl;
        var ne = o.eff.ne;
        nl.run(stageNode,nl.attr);//离场
        ne.run(prevNode,ne.attr);//进场
    },false);
}
