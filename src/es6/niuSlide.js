import {LoadImage} from './util/loadImage.js';
import {div,btn} from './util/util.js';

var arr1 = [
    'http://speakingjs.com/es5/orm_front_cover.jpg',
    'http://exploringjs.com/impatient-js/img/cover-homepage.jpg',
    'http://exploringjs.com/es6/images/cover.jpg',
    'http://exploringjs.com/es2016-es2017/images/cover.jpg',
    'http://exploringjs.com/es2018-es2019/img/cover-homepage.jpg'
]

var lm = new LoadImage('lm');
window.addEventListener('lmFirstImageLoad',function(){
    console.log('第一张加载完毕');
},false);



class NiuSlide{
    constructor(container,obj){
        if(typeof container === 'string'){
            this.containerElement = document.querySelector(container);
        } else {
            this.containerElement = container;//挂载元素
        }
        this.pageArr = obj.pageArr;//拥有图片的数组
        //创建并且获取轮播图节点
        this.createNodes();
    }

    createNodes(){
        this.boxElement = div('ns_box');
        this.stageElement = div('ns_stage');
        this.item1Element = div('ns_item ns_item_show ns_item_cur','item1');
        this.item2Element = div('ns_item ns_item_hidden ns_item_next','item2');
        this.controlElement = div('ns_control');
        this.negElement = btn('ns_neg');
        this.posElement = btn('ns_pos');
        this.boxElement.append(this.stageElement);
        this.boxElement.append(this.controlElement);
        this.stageElement.append(this.item1Element);
        this.stageElement.append(this.item2Element);
        this.controlElement.append(this.negElement);
        this.controlElement.append(this.posElement);
        this.containerElement.append(this.boxElement);
    }
    //将数组加功成自己需要的格式
    static foamatArr(){

    }
}

var ns1 = new NiuSlide('.niu',{
    pageArr:arr1
});
console.log(ns1);
