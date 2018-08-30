//创建自定义事件
export function createEvent(name){
    return new CustomEvent(name);
}
//创建div节点
export function div(className,id){
    var node = document.createElement('div');
    if(className){
        node.className = className;
    }
    if(id){
        node.id = id;
    }
    return node;
}
//创建button
export function btn(className,id){
    var node = document.createElement('button');
    if(className){
        node.className = className;
    }
    if(id){
        node.id = id;
    }
    return node;
}
