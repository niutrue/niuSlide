//找到舞台上的节点和幕后的节点
export function findNode(o){

    if(o.item1Element.classList.contains('ns_item_cur')){
        o.stageNode = o.item1Element;
        o.backNode = o.item2Element;
    } else {
        o.stageNode = o.item2Element;
        o.backNode = o.item1Element;
    }
}