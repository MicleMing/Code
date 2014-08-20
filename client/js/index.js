$(function(){

    // file uploader
    !function(){
        var fileInput = $('#file-in'),
            addrInput = $('#addr-in');

        var validExts = ['zip', 'js', 'md'];

        var updateInput = function(filePath){
            if(filePath){
                var name = /([^\/\\]+)$/.exec(filePath)[1];
                addrInput.val(name);
                addrInput[0].disabled = true;
            }else{
                addrInput.val('');
                addrInput[0].disabled = false;
            }
        };

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

        fileInput.on('change', function(e){
            updateInput(this.value);
        });
    }();

});