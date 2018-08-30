import {LoadImage} from './util/loadImage.js';
import {div,btn,setStyle} from './util/util.js';
import {arrow} from './handlers/arrow.js';

var arr1 = [
    'http://exploringjs.com/es2018-es2019/img/cover-homepage.jpg',
    'http://speakingjs.com/es5/orm_front_cover.jpg',
    'http://exploringjs.com/impatient-js/img/cover-homepage.jpg',
    'http://exploringjs.com/es6/images/cover.jpg',
    'http://exploringjs.com/es2016-es2017/images/cover.jpg',
]


class NiuSlide{
    constructor(container,obj){
        if(typeof container === 'string'){
            this.containerElement = document.querySelector(container);
        } else {
            this.containerElement = container;//挂载元素
        }
        this.pageArr = obj.pageArr;//拥有图片的数组
        this.curIndex = 0;//当前显示的页码
        this.nextIndex = 1;//接下来要显示的页码
        //创建并且获取轮播图节点
        this.createNodes();
        arrow(this);//这里应该是可配置的
    }
    //创建并且现实dom,完成初始化,初始化，一个台前，一个幕后
    createNodes(){
        this.boxElement = div('ns_box');
        this.stageElement = div('ns_stage');
        this.item1Element = div('ns_item ns_item_cur','item1');
        setStyle(this.item1Element,{//一个元素是表演状态
            left:'0px',
            top:'0px',
            backgroundImage:`url(${this.pageArr[this.curIndex]})`
        })
        this.item2Element = div('ns_item ns_item_next','item2');
        setStyle(this.item2Element,{//一个元素是后台状态
            left:'0px',
            top:'100%',
            backgroundImage:`url(${this.pageArr[this.nextIndex]})`
        })
        this.controlElement = div('ns_control');
        this.negElement = btn('ns_neg');
        this.posElement = btn('ns_pos');
        this.boxElement.append(this.stageElement);
        this.boxElement.append(this.controlElement);
        this.stageElement.append(this.item1Element);
        this.stageElement.append(this.item2Element);
        this.controlElement.append(this.posElement);
        this.controlElement.append(this.negElement);
        //this.containerElement.append(this.boxElement);
    }
    //将初始化好的Node结构放页面中
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
    pageArr:arr1
});
console.log(ns1);
