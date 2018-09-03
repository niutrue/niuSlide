import {arrow} from './arrow.js';

var handlersMap = {
    'arrow':arrow
}

export function proHandlers(o){
    var handlers = [];
    if(o.handlers&&o.handlers.length){
        handlers = o.handlers;
        for(let i = 0;i < handlers.length; i++){
            let proHandler = handlersMap[handlers[i]];
            if(proHandler){
                proHandler(o);
            }
        }
    }
}
