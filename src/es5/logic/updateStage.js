'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateStage = updateStage;
exports.updateReadyNode = updateReadyNode;
exports.updatePlayNode = updatePlayNode;

var _switch = require('../switch/switch.js');

var _util = require('../util/util.js');

var _changePageIndex = require('../logic/changePageIndex.js');

var _findNode = require('./findNode.js');

//更新舞台表演元素的状态，为下一次专场效果做准备
function updateStage(o) {
    //正向入场特效类型和正向属性，nextNode的初始状态
    //反向入场特效，prevNode的初始状态
    //双向离场特效，决定stageNode的初始状态
    //使用 Object.assign的时候，不想改变原始对象，就这样
    (0, _changePageIndex.changePageIndex)(o);
    var pe = o.posEffect;
    var ne = o.negEffect;
    var nextInitAttr = _switch.swMap[pe.enter].attrMap.rightAttr;
    nextInitAttr = Object.assign({}, nextInitAttr, { backgroundImage: `url(${o.pageArr[o.nextIndex]})` });
    var prevInitAttr = _switch.swMap[ne.enter].attrMap.leftAttr;
    prevInitAttr = Object.assign({}, prevInitAttr, { backgroundImage: `url(${o.pageArr[o.prevIndex]})` });
    var neOutAttr = _switch.swMap[ne.leave].attrMap.stageAttr;
    var peOutAttr = _switch.swMap[pe.leave].attrMap.stageAttr;
    var curInitAttr = Object.assign({}, neOutAttr, peOutAttr, { backgroundImage: `url(${o.pageArr[o.curIndex]})` });

    var stageNodes = o.stageElement.childNodes;
    stageNodes[0].classList.add('item_nr');
    (0, _util.setStyle)(stageNodes[0], prevInitAttr);
    stageNodes[1].classList.add('item_cur');
    (0, _util.setStyle)(stageNodes[1], curInitAttr);
    stageNodes[2].classList.add('item_pr');
    (0, _util.setStyle)(stageNodes[2], nextInitAttr);
}
//离场成功之后，重新初始化准备元素
//入场成功之后，重新初始化舞台元素
//看来我需要知道入场node和出场node
function updateReadyNode(o) {
    o.leaveSign = true;
    updatePageIndex(o);
    var node = o.tempNode;
    var pe = o.posEffect;
    var ne = o.negEffect;
    if (node.swDir === 'pos') {
        var nextInitAttr = _switch.swMap[pe.enter].attrMap.rightAttr;
        var initAttr = _switch.swMap[pe.leave].attrMap.readyAttr; //同一种要被next覆盖
        //Object是不是 相同属性的话 后面的覆盖前面的
        nextInitAttr = Object.assign({}, initAttr, nextInitAttr, {
            backgroundImage: `url(${o.pageArr[o.nextIndex]})`,
            transition: ''
        });
        (0, _util.setStyle)(node, nextInitAttr);
        node.classList.remove('item_cur');
        node.classList.add('item_pr');
        //另一个准备dom
        var otherNode = (0, _findNode.findNode)(o.stageElement.childNodes, 'item_nr');
        otherNode.style.backgroundImage = `url(${o.pageArr[o.prevIndex]})`;
    } else if (node.swDir === 'neg') {
        var prevInitAttr = _switch.swMap[ne.enter].attrMap.leftAttr;
        var initAttr = _switch.swMap[ne.leave].attrMap.readyAttr;
        prevInitAttr = Object.assign({}, initAttr, prevInitAttr, {
            backgroundImage: `url(${o.pageArr[o.prevIndex]})`,
            transition: ''
        });
        (0, _util.setStyle)(node, prevInitAttr);
        node.classList.remove('item_cur');
        node.classList.add('item_nr');
        //另一个准备dom
        var otherNode = (0, _findNode.findNode)(o.stageElement.childNodes, 'item_pr');
        otherNode.style.backgroundImage = `url(${o.pageArr[o.nextIndex]})`;
    }
}

function updatePlayNode(o) {
    o.enterSign = true;
    updatePageIndex(o);
    var node = o.tempNode;
    var pe = o.posEffect;
    var ne = o.negEffect;
    var neOutAttr = _switch.swMap[ne.leave].attrMap.stageAttr;
    var peOutAttr = _switch.swMap[pe.leave].attrMap.stageAttr;
    var curInitAttr = Object.assign({}, neOutAttr, peOutAttr, {
        transition: ''
    });
    (0, _util.setStyle)(node, curInitAttr);
    node.classList.remove('item_pr');
    node.classList.remove('item_nr');
    node.classList.add('item_cur');
}

function updatePageIndex(o) {
    if (o.enterSign && o.leaveSign) {
        o.enterSign = false;
        o.leaveSign = false;
    } else {
        (0, _changePageIndex.changePageIndex)(o);
    }
}
//入场和离场都需要更新视图，但是呢，改变当前图片的索引，只能一个去执行
//入场先完成，离场后完成
//离场先完成，入场后完成
//更新索引当然是先完成了