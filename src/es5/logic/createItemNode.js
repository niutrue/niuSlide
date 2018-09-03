'use strict';

//创建项目元素的模式 和 转场效果 对应映射
//可是 退场和入场有可能是两种动画效果
//一种动效，是一种模型，需要一种配置
//moveIn有两个方向，是改变left，初始需要3个dom，一个是舞台状态，两个是准备状态。
//之前是dom的移除和添加，现在是dom的属性改变
//舞台状态的元素下一阶段就是准备状态
//进场准备状态   进场舞台状态  设置退场相关属性(开始)
//退场准备状态  退场结束状态  --> 进场准备状态 设置进场相关属性(结束)
//动态效果函数需要相互访问，搞一个总的字典好了
//看来一个模块还是写成对象比较好，因为只要以复杂就需要把函数改成对象啊！！！\
//因为两个方向的缓动，其实是两种缓动，transition属性需要三个dom。只考虑一种场景倒是很简单的。

var map = {
    2: ['fadeIn', 'fadeOut'],
    3: ['moveIn', 'moveOut']
    //数组种是否包含某项
};function getMode(eleIn, eleOut) {
    var inMode = 0,
        outMode = 0;
    for (let key in map) {
        for (let i = 0; i < map[key].length; i++) {
            if (map[key][i] === eleIn) {
                inMode = key;
            } else if (map[key][i] === eleOut) {
                outMode = key;
            }
        }
    }
    return Math.max(inMode, outMode);
}

function createItemNode(eleIn, eleOut) {
    var mode = getMode(eleIn, eleOut);
    if (mode === 3) {}
}

createItemNode('fadeIn', 'moveOut');

//