'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changePageIndex = changePageIndex;
exports.calIndex = calIndex;
//跟页面方向有关 pageDir

function changePageIndex(o) {
    if (o.pageMode === 'pos') {
        //现在我又不想这样写了，想写简单些
        o.curIndex++;
    } else if (pageDir === 'neg') {
        o.curIndex--;
    }
    calIndex(o);
}
//大小无限的数字，向一段固定长度数字序列转化
function calIndex(o) {
    o.curIndex = transNum(o.curIndex);
    o.nextIndex = transNum(o.curIndex + 1);
    o.prevIndex = transNum(o.curIndex - 1);
}
function transNum(num) {
    num = num % length;
    if (num < 0) {
        num = num + length;
    }
}