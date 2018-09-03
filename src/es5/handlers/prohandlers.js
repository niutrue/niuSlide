'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.proHandlers = proHandlers;

var _arrow = require('./arrow.js');

var handlersMap = {
    'arrow': _arrow.arrow
};

function proHandlers(o) {
    var handlers = [];
    if (o.handlers && o.handlers.length) {
        handlers = o.handlers;
        for (let i = 0; i < handlers.length; i++) {
            let proHandler = handlersMap[handlers[i]];
            if (proHandler) {
                proHandler(o);
            }
        }
    }
}