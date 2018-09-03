import {LoadImage} from './util/loadImage.js';
import {div,btn,setStyle} from './util/util.js';
import {proHandlers} from './handlers/proHandlers.js';
import {createStageNodes} from './logic/createStageNodes.js';
import {createItemNodes} from './logic/createItemNodes.js';
import {updateStage} from './logic/updateStage.js';

var arr1 = [
    'http://exploringjs.com/es2018-es2019/img/cover-homepage.jpg',
    'http://speakingjs.com/es5/orm_front_cover.jpg',
    'http://exploringjs.com/impatient-js/img/cover-homepage.jpg',
    'http://exploringjs.com/es6/images/cover.jpg',
    'http://exploringjs.com/es2016-es2017/images/cover.jpg',
]


class NiuSlide{
    constructor(container,opt){
        console.log(opt)
        //初始化属性
        this.pageArr = opt.pageArr;//装有图片的数组
        this.pageNum = opt.pageArr.length;//页面的数目
        this.curIndex = 0;//当前显示的页码
        this.nextIndex = 1;//接下来要显示的页码
        this.pageMode = 'pos';//换页模式，正向，负向
        this.stageNode = null;//舞台上的node要退场
        this.nextNode = null;//一个准备node
        this.prevNode = null;//另一个准备node
        this.posEffect = opt.posEffect;//正向进场退场效果名称
        this.negEffect = opt.negEffect;//负向进场退场效果名称
        this.handlers = opt.handlers;//传进来的事件类型（交互类型）
        //之后还有可能多种，其实这是入场特效可能性的数量，transition限制的
        //node操作
        if(typeof container === 'string'){
            this.containerElement = document.querySelector(container);
        } else {
            this.containerElement = container;//挂载元素
        }
        //创建并且获取轮播图节点
        createStageNodes(this);
        createItemNodes(this);
        proHandlers(this);
        updateStage(this);
    }
    render(){
        this.containerElement.append(this.boxElement);
    }
    //将数组加功成自己需要的格式
    static foamatArr(){

    }
}

var lm = new LoadImage('lm');
lm.loadImages(arr1);
window.addEventListener('lmFirstImageLoad',function(){
    ns1.render();//这样经常可以访问到。变量提升加异步访问可以
},false);

var ns1 = new NiuSlide('.niu',{
    pageArr:arr1,
    handlers:['arrow','slide'],//字符串对象
    posEffect:{
        enter:'moveH',//字符串，对象
        leave:'fade'
    },
    negEffect:{
        enter:'fade',
        leave:'moveH'
    }
});
console.log(ns1);
