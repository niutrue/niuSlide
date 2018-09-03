import {div,btn,setStyle} from '../util/util.js';
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
//就是再舞台上表演的元素有多少个
var modeMap = {//键值可以反过来的
    3:['fade','moveH']
}
//数组种是否包含某项
function getMode(arr){
    var modeArr = [];
    for(let key in modeMap){
        for(let i = 0;i < modeMap[key].length;i++){
            let item = modeMap[key][i];
             for(let i = 0; i< arr.length;i++){
                 if(item === arr[i]){
                     modeArr.push(Number(key));
                 }
             }
        }
    }
    return modeArr[0];
}

export function createItemNodes(o){
    var effArr = [];
    var pe = o.posEffect;
    if(typeof pe != undefined){
        effArr.push(pe.enter);
        effArr.push(pe.leave);
    }
    var ne = o.negEffect;
    if(typeof pe != undefined){
        effArr.push(ne.enter);
        effArr.push(ne.leave);
    }
    var mode = getMode(effArr);
    //创建动效相关的node，需要用到动效相关状态配置,不需要，事件绑定的时候，进行表演元素状态初始化
    if(mode === 3){
        for(let i = 0; i < mode;i++){
            o[`item${i}Element`] = div('ns_item',`item${i}`);
            o.stageElement.append(o[`item${i}Element`]);
        }
    }
}

















//
