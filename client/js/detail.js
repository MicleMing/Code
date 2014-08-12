$(function(){

    // global observer
    var observer = util.observer;

    // content-diff methd
    var compare = diff.compare;

    // layout
    !function(){
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

        observer.on('tab-checkout', function(data){
            switch(data.from){
            case 'formatted-diff':
                collapseDetail();
                break;

            default:;
            }

            switch(data.to){
            case 'formatted-diff':
                expandDetail();
                break;

            default:;
            }
        });
    }();

    // tree
    !function(){
        // tree
        $('#menu-tree').fancytree({
            source: {
                url: '../mock/file-tree.json'
            },
            activate: function(event, data){
                var node = data.node,
                    path = '../mock/' + node.key;

                observer.fire('file-chosen', {
                    path: path
                });
            }
        });
    }();

    // tabs
    !function(){
        var getTabName = function(tab){
            return tab.children('a').attr('href').slice(1, -6);
        };

        $('#code-blocks').tabs({
            activate: function(event, ui){
                observer.fire('tab-checkout', {
                    from: getTabName(ui.oldTab),
                    to: getTabName(ui.newTab)
                });
            }
        });
    }();

    // editors
    !function(){
        var syntaxMap = {
            'js': 'ace/mode/javascript',
            'json': 'ace/mode/json',
            'css': 'ace/mode/css',
            'less': 'ace/mode/less',
            'sass': 'ace/mode/sass',
            'html': 'ace/mode/html'
        };

        var editors = util.map({
            'jshint': $('#jshint-code'),
            'jscs': $('#jscs-code')
        }, function(dom, name){
            var editor = ace.edit(dom[0]);

            editor.setTheme('ace/theme/monokai');
            editor.session.setTabSize(4);
            editor.session.setOption("useWorker", false); // no syntax validate check

            // file chosen
            observer.on('file-chosen', function(data){
                var ext = util.getExt(data.path),
                    syntaxMode = syntaxMap[ext] || '';

                $.ajax(data.path, {
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
            });

            return editor;
        });
    }();

    // diff block
    !function(){
        function DiffBlock(wrapper){
            this.wrapper = wrapper;
        }

        util.extend(DiffBlock.prototype, {
            getDiff: function(){
                var lines1 = this.cnt1.split('\n');
                var lines2 = this.cnt2.split('\n');
                var linesDiff = compare(this.cnt1, this.cnt2, '\n').diff;

                var curr = {
                    lineNumber1: 0,
                    lineNumber2: 0,
                    prevEnd: 0
                };
                var lines = [];
                linesDiff.forEach(function(diff, i){
                    var start = diff[0],
                        len = diff[1],
                        to = diff[2];

                    lines1.slice(curr.prevEnd, start).forEach(function(cnt){
                        lines.push({
                            type: 'normal',
                            content: cnt,
                            lineNumber1: ++curr.lineNumber1,
                            lineNumber2: ++curr.lineNumber2
                        });
                    });

                    lines1.slice(start, start + len).forEach(function(cnt){
                        lines.push({
                            type: 'remove',
                            content: cnt,
                            lineNumber1: ++curr.lineNumber1,
                            lineNumber2: '&nbsp;'
                        });
                    });

                    to && to.split('\n').forEach(function(cnt){
                        lines.push({
                            type: 'insert',
                            content: cnt,
                            lineNumber1: '&nbsp;',
                            lineNumber2: ++curr.lineNumber2
                        });
                    });

                    curr.prevEnd = start + len;
                });

                this.lines = lines;
            },
            renderDiff: function(){
                var marks = {
                    normal: '&nbsp;',
                    remove: '-',
                    insert: '+'
                };

                this.wrapper.html(this.lines.map(function(line){
                    return [marks[line.type], line.lineNumber1, line.lineNumber2, line.content].join('\t') + '<br/>';
                }));
            },
            setContent: function(cnt1, cnt2){
                this.cnt1 = cnt1;
                this.cnt2 = cnt2;

                this.getDiff();
                this.renderDiff();
            }
        });

        var formattedDiffBlock = new DiffBlock($('#formatted-diff-code'));

        var getFormattedPath = function(path){
            return path.replace(/(\.\w+){0,1}$/, function(ext){
                return '-formatted' + ext;
            });
        };

        observer.on('file-chosen', function(data){
            $.when(
                $.ajax(data.path, {dataType: 'text'}),
                $.ajax(getFormattedPath(data.path), {dataType: 'text'})
            ).done(function(origin, formatted){
                formattedDiffBlock.setContent(origin[0], formatted[0]);
            });
        });

        formattedDiffBlock.setContent('aaa\nbbb', 'bbb\nccc\nddd');
    }();

});