$(function(){

    // global observer
    var storage = window.sessionStorage;
    var observer = util.observer;
    var baseUrl = "http://localhost/CodeDoctor/upload/localUpload/";
    var phpContrlUrl = 'http://localhost/CodeDoctor/web/getInfo.php';
    var prefix = 'CODEDOCTOR_';
    var isFormatterOnline = false;

    //当检查新项目的时候，先清空sessionStorage，防止storage过大
/*    if ((/(person\.php)$/g).test(document.referrer)) {
        for (var i = 0, len = storage.length; i < len; i++ ) {
            var key = storage.key(i);
            if (key.substring(0, prefix.length) === prefix) {
                storage.removeItem(key);
            }
        }
    }*/

    // layout
    !function(){
        var menuWrapper = $('#menu-wrapper');
        var detailWrapper = $('#detail-wrapper');

        var expandDetail = function(){
            menuWrapper.css('width', '15%');
            detailWrapper.css('marginLeft', '16%');
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
                observer.fire('diff-checkout', {
                    path: storage.getItem(prefix + 'currenFile')
                });
                break;

            case 'formatted-fix':
                isFormatterOnline = true;
                break;

            default: isFormatterOnline = false;
            }
        });
    }();

    // tree
    !function(){
        // tree
        var search = location.search.substring(1);
        var ret = search.split('&');
        var obj = {};
        ret.forEach(function (item) {
            var temp = item.split('=');
            var key = temp[0];
            obj[key] = temp[1];
        });
        var checkUrl = 'http://localhost/CodeDoctor/web/detail.php';
        if (obj['item']) {
            checkUrl = checkUrl+'?item='+obj['item'];

            var fileKey = storage.getItem('fileKey');
            if (fileKey) {
                //加载不同的项目，清除sessionStorage
                if(fileKey !== obj['item']) {
                    for (var i = 0; i < storage.length; i++ ) {
                        var key = storage.key(i);
                        if (key && key.substring(0, prefix.length) === prefix) {
                            storage.removeItem(key);
                            i--;
                        }
                    } 
                    
                }
            }
            //重置filekey
            storage.setItem('fileKey', obj['item']);

        }
        else {
            //从非person.php进入，先清空sessionStorage
            for (var i = 0; i < storage.length; i++ ) {
                var key = storage.key(i);
                if (key && key.substring(0, prefix.length) === prefix) {
                    storage.removeItem(key);
                    i--;
                }
            } 
            storage.setItem('fileKey', 'index');
        }
        $.ajax({
            url: checkUrl,
            type: "GET",
            dataType: "json"
        })
        .success(function (data) {
            var key = data.key
            var json = baseUrl + key + '/tree.json';
            $('#menu-tree').fancytree({
                source: {
                    url: json
                },
                activate: function(event, data){

                    var node = data.node,
                        //path = baseUrl + key + '/' + node.key;
                        path = key + '/' + node.key

                    observer.fire('file-chosen', {
                        url: 'http://localhost/CodeDoctor/web/getInfo.php',
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
            'fecs': $('#jscs-code')
        }, function(dom, name){
            var editor = ace.edit(dom[0]);

            editor.setTheme('ace/theme/monokai');
            editor.session.setTabSize(4);
            editor.session.setOption("useWorker", false); // no syntax validate check

            // file chosen
            observer.on('file-chosen', function(data){

                storage.setItem(prefix+'currenFile', data.path);

                var code = storage.getItem(prefix + data.path);
                var ext = util.getExt(data.path),
                    syntaxMode = syntaxMap[ext] || '';

                //jshint fecs
                $.ajax(data.url, {
                    dataType: 'json',
                    type: 'POST',
                    data:{
                        path: data.path
                    },
                    success: function(data){
                        var currenFile = storage.getItem(prefix+'currenFile');
                        util.forEach(editors, function(editor, index){
                            if (code && code !== '') {
                                editor.setValue(code);
                            }
                            else {
                                editor.setValue(data.code);
                                console.log(data.code);
                            }
                            editor.navigateTo(0, 0);
                            editor.session.setMode(syntaxMode);
                            if(index === 'jshint') {
                                var annotationArr = [];
                                data.codeInfo.forEach(function (item) {
                                    annotationArr.push({
                                        row: item.row - 1,
                                        html: 'row' + ':' + item.row + ';col ' + item.col + ':' +item.ression,
                                        type: 'error'
                                    });
                                })

                                editor.session.setAnnotations(annotationArr);
                            }

                            if(index === 'fecs') {
                                var annotationArr = [];
                                if (data.fecsInfo.warn) {
                                    data.fecsInfo.warn.forEach(function (item) {
                                        annotationArr.push({
                                            row: item.row -1,
                                            html: 'row' + ':' + item.row + ';col ' + item.col + ':' +item.ression,
                                            type: 'warning'
                                        });
                                    });
                                    editor.session.setAnnotations(annotationArr);
                                }
                            }



                            editor.commands.addCommand({
                                name: 'myCommand',
                                bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
                                exec: function(editor) {
                                    var changeCode = editor.getValue();
                                    storage.setItem(prefix + currenFile, changeCode);
                                },
                                readOnly: true // false if this command should not apply in readOnly mode
                            });
                            
                        });
                    }
                });
            });

            return editor;
        });

        //js 格式化editor单独列出来
        var formatterEditor = ace.edit('formatted-fix-code');
        formatterEditor.setTheme('ace/theme/monokai');
        formatterEditor.session.setTabSize(4);
        formatterEditor.session.setOption("useWorker", false);
        formatterEditor.session.setMode(syntaxMap['js']);
        formatterEditor.setValue('aaa');
        observer.on('file-chosen', function(data){
            if (isFormatterOnline) {
                $.ajax({
                    url: phpContrlUrl,
                    type: 'POST',
                    data: {
                        path: data.path,
                        formatter: true
                    },
                    success: function (data) {
                        //var data = JSON.parse(data);
                        formatterEditor.setValue(data);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
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

        observer.on('file-chosen diff-checkout', function(data){
            var path = baseUrl+data.path.replace(/\\/g,'/');
/*            $.when(
                $.ajax(path, {dataType: 'text'}),
                $.ajax(getFormattedPath(data.path), {dataType: 'text'})
            ).done(function(origin, formatted){
                formattedDiffBlock.setContent(origin[0], formatted[0]);
            });*/

            var currenFile = storage.getItem(prefix + 'currenFile');
            var changeCode = storage.getItem(prefix + currenFile);
            $.ajax(path, {
                dataType: 'text',
                success: function (data) {
                    formattedDiffBlock.setContent(data, changeCode ? changeCode : data);
                }
            })     
        });



        formattedDiffBlock.init($('#formatted-diff-code'), '', '');
    }();

});