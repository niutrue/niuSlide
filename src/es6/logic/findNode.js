//找到舞台上的节点和各方向的节点
export function findNode(list,cn){
    var result = null;
    if(list.length){
        for(let i = 0;i < list.length;i++){
            if(list[i].classList.contains(cn)){
                result = list[i];
            }
        }
    }
    return result;
}
