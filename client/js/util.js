(function(window, undefined){
    'use strict';

    // helpers
    var type = Object.prototype.toString.call.bind(Object.prototype.toString);

    var forEach = function(object, handler){
        if(type(object) === '[object Array]'){
            for(var i = 0, l = object.length; i < l && handler(object[i], i) !== false; i++);
            return;
        }

        for(var key in object) if(object.hasOwnProperty(key) && handler(object[key], key) === false) return;
    };

    var map = function(object, handler){
        if(!object) return object;

        var target = type(object) === '[object Array]' ? [] : {};
        forEach(object, function(val, key){
            target[key] = handler(val, key);
        });

        return target;
    };

    var clone = function(obj){
        if(!obj) return obj;
        var o = new obj.constructor();
        forEach(obj, function(val, key){o[key] = val});
        return o;
    };

    var extend = function(target, addon, newTarget){
        target = (newTarget ? clone(target) : target) || {};
        forEach(addon, function(val, key){target[key] = val;});
        return target;
    };

    var getExt = function(name){
        var p = /\.(\w+)$/;
        return p.test(name) ? p.exec(name)[1] : '';
    };

    // event (on, un, fire, obsevable)

    var on = function(name, handler) {
        var self = this;
        var name = name.split(' ');
        name.forEach(function (item) {
            if (item !== '') {
                (self._list[item] = self._list[item] || []).push(handler);
            }
        });  
    };

    var un = function(name, handler) {
        var list = this._list[name];
        if(list){
            var nlist = [];
            for(var i = 0, l = list.length; i < l; i++){
                if(list[i] !== handler) nlist.push(list[i]);
            }
     
            list[name] = nlist.length ? nlist : null;
        }
    };

    var fire = function(name, data) {
        (this._list[name] || []).forEach(function(handler){
            try{
                handler.call(this, data);
            }catch(e){
                console.error(e.stack || e);
            }
        });
    };

    var observable = function(target){
        return extend(target || {}, {
            _list: {},
            on: on,
            un: un,
            fire: fire
        });
    };

    var render = function(template, vars){
        return template.replace(/\$\{([^\{\}]*)\}/g, function(_, name){
            return vars[name.trim()] || '';
        });
    };

    var encodeHTML = function(str){
        return str.replace(/&/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/ /g, "&nbsp;")
            .replace(/\'/g, "'")
            .replace(/\"/g, "&quot;")
            .replace(/\n/g, "<br>");
    };

    // simple split
    var simpleSplit = function(cnt){
        return cnt.split('');
    };

    // participle code / word
    var participle = function(cnt){
        var arr = [];
        for(var i = 1, l = cnt.length, pos = 0; i < l; i++){
            var isPlainPattern = /[\w\_\$]+/,
                isPrevPlain = isPlainPattern.test(cnt[i-1]),
                isPlain = isPlainPattern.test(cnt[i]);

            if(
                !(isPrevPlain && isPlain)
            ){
                arr.push(cnt.slice(pos, i));
                pos = i;
            }

            if(i === l-1){
                arr.push(cnt.slice(pos));
            }
        }
        return arr;
    };

    // export

    extend(window, {
        util: {
            type: type,
            forEach: forEach,
            map: map,
            clone: clone,
            extend: extend,
            getExt: getExt,
            observable: observable,
            observer: observable(),
            render: render,
            encodeHTML: encodeHTML,
            simpleSplit: simpleSplit,
            participle: participle
        }
    });

})(this);