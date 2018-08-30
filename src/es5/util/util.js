'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEvent = createEvent;
exports.div = div;
exports.btn = btn;
exports.setStyle = setStyle;
//创建自定义事件
function createEvent(name) {
    return new CustomEvent(name);
}
//创建div节点
function div(className, id) {
    var node = document.createElement('div');
    if (className) {
        node.className = className;
    }
    if (id) {
        node.id = id;
    }
    return node;
}
//创建button
function btn(className, id) {
    var node = document.createElement('button');
    if (className) {
        node.className = className;
    }
    if (id) {
        node.id = id;
    }
    return node;
}
//给元素设置样式
function setStyle(ele, style) {
    for (var key in style) {
        ele.style[key] = style[key];
    }
}

//