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
        var marks = {
            normal: '',
            remove: '-',
            insert: '+'
        };

        var templates = {
            table: {
                table: '<table class="diff-block"><tbody>${cnt}</tbody></table>'
            },
            part: {
                lineNumber: '<td class="line-num">${cnt}</td>',
                mark: '<td class="mark">${cnt}</td>'
            },
            line: {
                normal: '<tr id="line-${num}" class="line normal">${parts}<td>${code}</td></tr>',
                remove: '<tr id="line-${num}" class="line remove">${parts}<td>${code}</td></tr>',
                insert: '<tr id="line-${num}" class="line insert">${parts}<td>${code}</td></tr>'
            },
            code: {
                normal: '<span class="code normal">${cnt}</span>',
                remove: '<span class="code remove">${cnt}</span>',
                insert: '<span class="code insert">${cnt}</span>'
            }
        };

        var render = util.render;
        var getLine = function(line, i){
            return render(templates.line[line.type], {
                num: i + 1,
                parts: [
                    [templates.part.lineNumber, line.pos1],
                    [templates.part.lineNumber, line.pos2],
                    [templates.part.mark, marks[line.type]]
                ].map(function(arr){
                    return render(arr[0], {
                        cnt: arr[1]
                    });
                }).join(''),
                code: line.cnt.map(function(code){
                    return render(templates.code[code.type], {
                        cnt: code.cnt
                    });
                }).join('')
            });
        };
        var getTable = function(lines){
            return render(templates.table.table, {
                cnt: lines.map(getLine).join('')
            });
        };

        var formattedDiffBlock = {
            init: function(wrapper, cnt1, cnt2){
                this.wrapper = wrapper;
                this.setContent(cnt1, cnt2);
            },
            getDiff: function(){
                var lines1 = this.cnt1.split('\n');
                var lines2 = this.cnt2.split('\n');

                var lines = [];
                var curr = {
                    pos1: 0,
                    pos2: 0,
                    prevEnd: 0
                };
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

                lines.forEach(function(line, i){
                    var prev = lines[i-1],
                        curr = lines[i],
                        next = lines[i+1],
                        nnext = lines[i+2];

                    if(
                        (!prev || prev.type !== 'remove') &&
                        (curr.type === 'remove') &&
                        (next.type === 'insert') &&
                        (!nnext || nnext.type !== 'insert')
                    ){
                        var prevEnd = 0,
                            origin = curr.cnt,
                            target = next.cnt,
                            originArr = [],
                            targetArr = [];

                        compare(curr.cnt, next.cnt).diff.forEach(function(diff, i){
                            var start = diff[0],
                                len = diff[1],
                                to = diff[2];

                            var kept = origin.slice(prevEnd, start);
                            if(kept){
                                originArr.push({
                                    type: 'normal',
                                    cnt: kept
                                });

                                targetArr.push({
                                    type: 'normal',
                                    cnt: kept
                                });
                            }
                            
                            var removed = origin.slice(start, start + len);
                            if(removed){
                                originArr.push({
                                    type: 'remove',
                                    cnt: removed
                                });
                            }

                            var inserted = to;
                            if(inserted){
                                targetArr.push({
                                    type: 'insert',
                                    cnt: inserted
                                });
                            }

                            prevEnd = start + len;
                        });

                        
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
            renderDiff: function(){
                this.wrapper.html(getTable(this.lines));
            },
            setContent: function(cnt1, cnt2){
                this.cnt1 = cnt1;
                this.cnt2 = cnt2;

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