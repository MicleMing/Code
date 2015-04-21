$(function(){

    // global observer
    var observer = util.observer;
    var baseUrl = "http://localhost/CodeDoctor/upload/localUpload/"

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
        $.ajax({
            url: "http://localhost/CodeDoctor/web/check.php",
            type: "GET",
            dataType: "json"
        })
        .success(function (data) {
            var json = baseUrl + data.key + '/tree.json';
            $('#menu-tree').fancytree({
                source: {
                    url: json
                },
                activate: function(event, data){
                    var node = data.node,
                        path = '../mock/' + node.key;

                    observer.fire('file-chosen', {
                        path: path
                    });
                }
            });           
        })

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
        var compare = diff.compare;

        var render = util.render;

        var marks = {
            normal: {
                title: '',
                mark: ''
            },
            remove: {
                title: 'removed',
                mark: '-'
            },
            insert: {
                title: 'inserted',
                mark: '+'
            }
        };

        var templates = {
            table: '<table class="diff-block"><tbody>${cnt}</tbody></table>',
            line: '<tr id="line-${num}" class="line ${type}">${parts}<td>${code}</td></tr>',
            lineNumber: '<td class="line-num">${num}</td>',
            mark: '<td title="${title}" class="mark">${mark}</td>',
            code: '<span class="code ${type}">${cnt}</span>'
        };

        var getLine = function(line, i){
            return render(templates.line, {
                num: i + 1,
                type: line.type,

                parts: [
                    [templates.lineNumber, {num: line.pos1}],
                    [templates.lineNumber, {num: line.pos2}],
                    [templates.mark, marks[line.type]]
                ].map(function(arr){
                    return render(arr[0], arr[1]);
                }).join(''),

                code: line.cnt.map(function(code){
                    return render(templates.code, {
                        type: code.type,
                        cnt: util.encodeHTML(code.cnt)
                    });
                }).join('')
            });
        };

        var getTable = function(lines){
            return render(templates.table, {
                cnt: lines.map(getLine).join('')
            });
        };

        // split method ( simple / participle )
        var split = util.participle;

        var formattedDiffBlock = {
            init: function(wrapper, cnt1, cnt2){
                this.wrapper = wrapper;
                this.setContent(cnt1, cnt2);
            },
            getLinesDiff: function(){
                var lines1 = this.cnt1.split('\n'),
                    lines2 = this.cnt2.split('\n'),
                    lines = [];

                var curr = {
                    pos1: 0,
                    pos2: 0,
                    prevEnd: 0
                };

                // deal with diffs
                compare(this.cnt1, this.cnt2, '\n').diff.forEach(function(diff, i){
                    var start = diff[0],
                        len = diff[1],
                        to = diff[2];

                    lines1.slice(curr.prevEnd, start).forEach(function(cnt){
                        lines.push({
                            type: 'normal',
                            cnt: cnt,
                            pos1: ++curr.pos1,
                            pos2: ++curr.pos2
                        });
                    });

                    lines1.slice(start, start + len).forEach(function(cnt){
                        lines.push({
                            type: 'remove',
                            cnt: cnt,
                            pos1: ++curr.pos1,
                            pos2: ''
                        });
                    });

                    to && to.split('\n').forEach(function(cnt){
                        lines.push({
                            type: 'insert',
                            cnt: cnt,
                            pos1: '',
                            pos2: ++curr.pos2
                        });
                    });

                    curr.prevEnd = start + len;
                });

                // same content after the last diff
                lines1.slice(curr.prevEnd).forEach(function(cnt){
                    lines.push({
                        type: 'normal',
                        cnt: cnt,
                        pos1: ++curr.pos1,
                        pos2: ++curr.pos2
                    });
                });

                this.lines = lines;
            },
            getInlineDiff: function(){
                var lines = this.lines;

                lines.forEach(function(line, i){
                    var prev = lines[i-1],
                        curr = lines[i],
                        next = lines[i+1],
                        nnext = lines[i+2];

                    if(
                        (!prev || prev.type !== 'remove') &&
                        (curr.type === 'remove') &&
                        (next && next.type === 'insert') &&
                        (!nnext || nnext.type !== 'insert')
                    ){
                        var prevEnd = 0,
                            origin = split(curr.cnt),
                            target = split(next.cnt),
                            originArr = [],
                            targetArr = [];

                        compare(curr.cnt, next.cnt, split).diff.forEach(function(diff, i){
                            var start = diff[0],
                                len = diff[1],
                                to = diff[2];

                            var kept = origin.slice(prevEnd, start).join('');
                            if(kept){
                                kept = {
                                    type: 'normal',
                                    cnt: kept
                                };
                                originArr.push(kept);
                                targetArr.push(kept);
                            }
                            
                            var removed = origin.slice(start, start + len).join('');
                            if(removed){
                                removed = {
                                    type: 'remove',
                                    cnt: removed
                                };
                                originArr.push(removed);
                            }

                            var inserted = to;
                            if(inserted){
                                inserted = {
                                    type: 'insert',
                                    cnt: inserted
                                };

                                targetArr.push(inserted);
                            }

                            prevEnd = start + len;
                        });

                        var leftKept = origin.slice(prevEnd).join('');
                        if(leftKept){
                            leftKept = {
                                type: 'normal',
                                cnt: leftKept
                            };

                            originArr.push(leftKept);
                            targetArr.push(leftKept);
                        }

                        curr.cnt = originArr;
                        next.cnt = targetArr;
                    }else if(typeof line.cnt === 'string'){
                        line.cnt = [{
                            type: 'normal',
                            cnt: line.cnt
                        }];
                    }
                });

                this.lines = lines;
            },
            getDiff: function(){
                this.getLinesDiff();
                this.getInlineDiff();
            },
            renderDiff: function(){
                this.wrapper.html(getTable(this.lines));
            },
            setContent: function(cnt1, cnt2){
                this.cnt1 = cnt1 || '';
                this.cnt2 = cnt2 || '';

                this.getDiff();
                this.renderDiff();
            }
        };

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

        formattedDiffBlock.init($('#formatted-diff-code'), 'aaa\nbbb\nccbdekf', 'bbb\nccc9832');
    }();

});