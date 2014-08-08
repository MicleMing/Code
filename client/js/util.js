(function(window, undefined){
    'use strict';

    // helpers
    var type = Object.prototype.toString.call.bind(Object.prototype.toString);

    var forEach = function(object, handler){
        if(type(object) === '[object Array]'){
            for(var i = 0, l = object.length; i < l && handler.call(this, object[i], i) !== false; i++);
            return;
        }

        for(var key in object) if(object.hasOwnProperty(key) && handler.call(this, object[key], key) === false) return;
    };

    var clone = function(obj){
        if(!obj) return obj;
        var o = new obj.constructor();
        forEach(obj, function(val, key){o[key] = val});
        return o;
    };

    var extend = function(target, addon, self){
        target = (self ? target : clone(target)) || {};
        forEach(addon, function(val, key){target[key] = val;});
        return target;
    };

    var getExt = function(name){
        var p = /\.(\w+)$/;
        return p.test(name) ? p.exec(name)[1] : '';
    };

    // export helpers
    extend(window, {
        util: {
            type: type,
            forEach: forEach,
            clone: clone,
            extend: extend,
            getExt: getExt
        }
    }, true);

})(this);