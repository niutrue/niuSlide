//跟页面方向有关 pageDir
var length;
export function changePageIndex(o){
    if(o.pageMode === 'pos'){//现在我又不想这样写了，想写简单些
        o.curIndex++;
    } else if(o.pageMode === 'neg') {
        o.curIndex--;
    }
    length = o.pageNum;
    calIndex(o);
}
//大小无限的数字，向一段固定长度数字序列转化
export function calIndex(o){
    o.curIndex = transNum(o.curIndex);
    o.nextIndex = transNum(o.curIndex + 1);
    o.prevIndex = transNum(o.curIndex - 1);
}

function transNum(num){
    num = num%length;
    if(num < 0){
        num = num + length;
    }
    return num;
}
