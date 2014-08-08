$(function(){
    var menuWrapper = $('#menu-wrapper');
    var detailWrapper = $('#detail-wrapper');

    var expandDetail = function(){
        menuWrapper.css('width', '9%');
        detailWrapper.css('marginLeft', '10%');
    },
        collapseDetail = function(){
        menuWrapper.css('width', '28%');
        detailWrapper.css('marginLeft', '30%');
    };

    var syntaxMap = {
        'js': 'ace/mode/javascript',
        'json': 'ace/mode/json',
        'css': 'ace/mode/css',
        'less': 'ace/mode/less',
        'sass': 'ace/mode/sass',
        'html': 'ace/mode/html'
    };

    // tree
    $('#menu-tree').fancytree({
        source: {
            url: '../mock/file-tree.json'
        },
        activate: function(event, data){
            var node = data.node,
                path = '../mock/' + node.key,
                ext = util.getExt(node.key),
                syntaxMode = syntaxMap[ext] || '';

            $.ajax(path, {
                dataType: 'text',
                success: function(data){
                    util.forEach(editors, function(editor){
                        editor.setValue(data);
                        editor.navigateTo(0, 0);

                        editor.session.setMode(syntaxMode);
                        editor.session.setAnnotations([
                            {
                                row: 0,
                                html: '<span>I\'m an error!</span>',
                                type: 'error'
                            },
                            {
                                row: 1,
                                text: 'I\'m a warning!',
                                type: 'warning'
                            },
                            {
                                row: 2,
                                text: 'I\'m info!',
                                type: 'info'
                            }
                        ]);
                    });
                }
            });
        }
    });

    // tabs
    $('#code-blocks').tabs({
        activate: function(event, ui){
            switch(ui.oldTab.children('a').attr('href')){

            case '#jshint-block':
                break;

            case '#jscs-block':
                break;

            case '#formatted-diff-block':
                collapseDetail();
                break;

            default:;
            }

            switch(ui.newTab.children('a').attr('href')){

            case '#jshint-block':
                break;

            case '#jscs-block':
                break;

            case '#formatted-diff-block':
                expandDetail();
                break;

            default:;
            }
        }
    });

    // editors
    var editors = {};
    ['jshint', 'jscs', 'formatted-diff'].forEach(function(name){
        $('#' + name + '-block').find('[data-code]').each(function(_, dom){
            var editor = editors[$(dom).attr('data-code')] = ace.edit(dom);

            editor.setTheme('ace/theme/monokai');
            editor.session.setTabSize(4);
            editor.session.setOption("useWorker", false); // no syntax validate check
        });
    });

});