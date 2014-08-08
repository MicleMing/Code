$(function(){
    $("#menu-tree").fancytree({
        source: {
            url: "../mock/file-tree.json"
        },
        activate: function(event, data){
            var node = data.node;
            var path = '../mock/' + node.key;
            $.ajax(path, {
                dataType: 'text',
                success: function(data){
                    editors.forEach(function(editor){
                        editor.setValue(data);
                        editor.clearSelection();
                        editor.gotoLine(1);
                    });
                }
            });
        }
    });

    $('#code-blocks').tabs();

    var editors = ['jshint', 'jscs', 'formatted'].map(function(name){
        var editor = ace.edit(name + "-block");
        editor.setTheme("ace/theme/monokai");
        //editor.getSession().setMode("ace/mode/javascript");
        editor.getSession().setTabSize(4);
        //editor.setReadOnly(true);

        return editor;
    });
    
});