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

//开始直接卡住!
function pauseSomeMinutes(min){
    window.requestAnimationFrame(goEnd);
    var reStartTime = + new Date() + (1000 * 60 * min);
    for(var i =  +new Date();i < reStartTime;i++){
        window.requestAnimationFrame(goEnd);
        i = + new Date();
    }
}

//pauseSomeMinutes(1);
var num = 0;
var s = window.requestAnimationFrame;
s(goEnd);
//不堵塞。两个进程啊
function goEnd(){//这个是封装啊
    num ++ ;
    console.log(num);//可以访问外界变量
    console.log(new Date().getSeconds());
    if(num ==20){
        s = undefined;
    }
    if(s){
        s(goEnd);
    }
}
//可以写多个，可以吗?
// window.requestAnimationFrame(goEnd);
//for和animation照样会卡
//callback里写条件呢？
//也可以赋值给变量
//https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
