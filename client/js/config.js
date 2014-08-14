/**
 * 静态页面config.html的js文件
 * @author yanyinhong <yanyinhong@baidu.com> 2014-08-12
 */
$(function(){
    $.getJSON("../json/config.json", function(data){
       var config_container = $(".config-container");
       
       var str = '';
       var output = function (key, value) {
           var str = '';
           
           if (typeof value == 'boolean') {
                str += '<div class="config-item">' +
                         '<span>' + key + ' </span>' + 
                         '<input type="checkbox" name="' + key + '"'; 
                if (value == true) {
                     str += ' checked';
                 }
                 str += '/>' + '</div>';
           } else if (typeof value == 'string') {
                str += '<div class="config-item">' + 
                            '<span>' + key + ' </span>' + 
                            '<input type="text" name="' + key + '" value="' + value + '"/>' + 
                       '</div>';
           } else if (typeof value == 'number') {
                str += '<div class="config-item">' + 
                            '<span>' + key + ' </span>' +
                            '<input type="number" name"' + key + '" min="-1000" max="1000">' +
                       '</div>';
           } else if (typeof value == 'object') {
               if (value instanceof Array) {
                   str += '<div class="config-item">' +
                                '<span>' + key + ' </span>' +
                                '<select>';
                  
                  $.each(value, function(key, value){
                      str += '<option value="' + value + '">' + value + '</option>';
                  });
                  
                  str += '</select></div>';
                  
               } else if (value instanceof Object && value !== null) {
                   str += '<div class="config-item"><span>' + key + '</span><div class="config-inner-container">'; 
                   
                   $.each(value, function(key, value){
                       str += output.apply(this, [key,value]);
                   });
                   
                   str += '</div></div>';
               } else {
                   str += '<div class="config-item"><span>' + key + '</span><input type="text" name="' + key + '" class="false-value" value="false value"></div>';
               }
           } else {
               str += '<div class="config-item"><span>' + key + '</span><input type="text" name="' + key + '" class="false-value" value="false value"></div>';
           }
           
           return str;
       }
              
       $.each(data, function(key, value){
            str += output(key,value);   
       });
       
       config_container.html(str);
    });
});

