/**
 * 静态页面config.html的js文件
 * @author lanmingming <lanmingming@baidu.com>
 */
$(function(){
   /* $.getJSON("../json/config-zh.json", function(data){
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
                            '<input type="number" name="' + key + '" min="-1000" max="1000" value="'+ value +'">' +
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
       str += '<input class="btn" type="submit" value="确定">';
       config_container.html(str);
    });*/

    $('.btn').click(function (e) {
        e.preventDefault();
        var config = {
            "maxlength": $('[name=maxlength]').attr('value'),
            "indent": $('[name=indent]').attr('value'),
            "useTabIndent": $('[name=useTabIndent]').is(':checked'),
            "spaces": {
                "around": {
                    "unaryOperations": $('[name=unaryOperations]').is(':checked'),
                    "binaryOperators": $('[name=binaryOperators]').is(':checked'),
                    "ternaryOperation": $('[name=ternaryOperation]').is(':checked')
                },
                "before": {
                    "functionDecalarationParentheses": $('[name=functionDecalarationParentheses]').is(':checked'),
                    "functionExpressionParentheses": $('[name=functionExpressionParentheses]').is(':checked'),
                    "parenthess": $('[name=parenthess]').is(':checked'),
                    "leftBrace": $('[name=leftBrace]').is(':checked'),
                    "keywords": $('[name=keywords]').is(':checked')
                },
                "within": {
                    "parenthess": $('[name=parenthess]').is(':checked')
                },
                "other": {
                    "beforePropertyNameValueSeparator": $('[name=beforePropertyNameValueSeparator]').is(':checked'),
                    "afterPropertyNameValueSeparator": $('[name=afterPropertyNameValueSeparator]').is(':checked')
                }
            },
            "bracesPlacement": {
                "functionDeclaration": $('[name=functionDeclaration]').attr('value'),
                "other": $('[name=other]').attr('value')
            },
            "blankLines": {
                "keepMaxBlankLines": $('[name=keepMaxBlankLines]').attr('value'),
                "atEndOfFile": $('[name=atEndOfFile]').is(':checked')
            },
            "other": {
                "keepArraySingleLine": $('[name=keepArraySingleLine]').is(':checked')
            }          
        }

        $.ajax({
            url:'../../web/config.php',
            type:'POST',
            data: config,
            success: function () {
                //location.href = './index.php';
            }
        })

    })
});

