//全部加载有事件
//第一个加载成功有事件
//其他图片是否加载完，查状态吧
//我需要自定义事件
import {createEvent} from './util.js';

export class LoadImage{
     constructor(name){
         this.name = name||'';//这个实例的名字，作为自定义事件的前缀
         this.loadStatus = {};
         this.totalNum = 0;
         this.completeNum = 0;
     }
     //加载一个图片
     loadImage(url,index){
         var that = this;
         let img = new Image();
         img.src = url;
         img.onload = function(){
             if(index != undefined){
                 that.loadStatus[index] = 'success';
                 if(index == 0){
                     window.dispatchEvent(createEvent(`${that.name}FirstImageLoad`));
                 }
                 that.loadComplete();
             }
         }
         img.onerror = function(){
             if(index != undefined){
                 that.loadStatus[index] = 'error';
                 that.loadComplete();
             }
         }
     }
     //加载多个图片
     loadImages(arr){
         this.totalNum = arr.length;
         if(!arr.length){return};
         for(let i = 0;i < arr.length;i++){
             this.loadImage(arr[i],i);
         }
     }
     //全部加载完成
     loadComplete(){
         this.completeNum++;
         if(this.completeNum === this.totalNum){
             window.dispatchEvent(createEvent(`${this.name}AllImagesLoad`));
         }
     }
 }
