'use strict';

var stage = document.querySelector('.ns_stage');
var ns_neg = document.querySelector('.ns_neg');
var ns_pos = document.querySelector('.ns_pos');

var curIndex = 0,
    nextIndex = curIndex + 1; //当前的图，下一张图
//图片资源加载完毕，失败咋办？dom提醒。
//轮播图初始样子，出现一张图，两个dom的。第二个再下方被隐藏好了
var itemStr = `<div class="ns_item ns_item_show ns_item_cur"  style="background-image:url(${arr1[curIndex]})"></div><div class="ns_item ns_item_hidden ns_item_next" style="background-image:url(${arr1[nextIndex]})"></div>`;
stage.innerHTML = itemStr;

//正向
ns_pos.addEventListener('click', function () {
    if (!imagesLoadComplete) return;
    //切换准备工作，将要出现的dom去预备位置，加图
    var nextNode = document.querySelector('.ns_item_next');
    nextNode.style.top = 0;
    nextNode.style.left = '100%'; //这是状态二
    //当前node退场，变成预备状态
    var curNode = document.querySelector('.ns_item_cur');
    //这样竟然有效啊，我还以为会没变化呢
    curNode.style.transition = 'left 0.5s ease';
    curNode.style.left = '-100%';
    //这个直接写不行，需要完成之后才可以。退场收尾工作
    curNode.addEventListener('transitionend', toBack, false);
    //预备node进场，变成当前状态。同时进场，或者推迟几秒，上一个退场之后进场，或者推迟几秒。
    //一次完整的切换包括当前退场，加准备进场。
    setTimeout(function () {
        nextNode.style.transition = 'left 0.5s ease';
        nextNode.style.left = 0;
    }, 0);

    nextNode.addEventListener('transitionend', toPlay, false);
}, false);

//反向
ns_neg.addEventListener('click', function () {
    console.log('左');
}, false);

//回到幕后状态
function toBack(e) {
    //更新当前显示图片序号，还有下一个序号
    posUpdateIndex();
    var node = e.target;
    node.style.transition = ''; //取消渐变属性
    node.style.left = '0';
    node.style.top = '100%';
    node.classList.remove('ns_item_cur'); //不能链式操作
    node.classList.add('ns_item_next');
    node.style.backgroundImage = `url(${arr1[nextIndex]})`;
    node.removeEventListener('transitionend', toBack, false);
}

function posUpdateIndex() {
    //现在我又不想这样写了，想写简单些
    curIndex++;
    nextIndex = curIndex + 1;
    curIndex = curIndex % arr1.length;
    nextIndex = nextIndex % arr1.length;
}