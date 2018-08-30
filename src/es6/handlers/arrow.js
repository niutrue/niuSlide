
export function arrow (o){
    var negBtn = o.negElement;
    var posBtn = o.posElement;
    posBtn.addEventListener('click',function(){
        console.log('dada');
    },false);
    negBtn.addEventListener('click',function(){
        console.log('dada');
    },false);
}
