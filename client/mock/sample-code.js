$(function(){
    $("#menu-tree").fancytree({
        source: {
            url: "../mock/file-tree.json"
        }
    });

    $('#code-blocks').tabs();

    ['jshint', 'jscs', 'formatted'].forEach(function(name){
        var editor = ace.edit(name + "-block");
        editor.setTheme("ace/theme/monokai");
        //editor.getSession().setMode("ace/mode/javascript");
        editor.getSession().setTabSize(4);
        //editor.setReadOnly(true);

        $.ajax('../mock/sample-code.js').then(function(data){
            editor.setValue(data);
        })
    });
    
});