$(function(){

    // file uploader
    !function(){

        var form = $('#form'),
            fileName = $('#file-name'),
            fileButton = $('#file-btn'),
            fileInput = $('#file-in'),
            urlInput = $('#url-in');

        var validExts = ['zip', 'js'];

        // set accepted file types
        fileInput.attr('accept', '.' + validExts.join(',.'));

        // switch mode based on file selected or not
        var updateInput = function(filePath){
            if(filePath){
                var name = /([^\/\\]+)$/.exec(filePath)[1];
                fileName.show().text('File: ' + name);
            }else{
                fileName.hide().text('');
            }
        };

        // validate
        fileInput.on('change', function(e){
            if(!this.value){
                return;
            }

            var ext = util.getExt(this.value);

            if(validExts.indexOf(ext) < 0){
                alert('Invalid file type! Only *.zip / *.js supported!')

                this.value = '';
                updateInput();
            }
        });

        // respond to file select
        fileInput.on('change', function(e){
            updateInput(this.value);
        });

        // listen to file name click
        fileName.on('click', function(){
            fileInput.click();
        });

        // listen to file-drag
        form.on('drop', function(e){
            e.preventDefault();

            var fileList = e.dataTransfer.files;
            if(fileList && fileList.length){
                var file = fileList[0];
            }
        });

    }();

});