let input_file = document.getElementById("image-button");
let image_list = document.getElementById("imageList");
let remove_image = document.getElementById('imageFl');

input_file.addEventListener('change', function(){
    image_list.innerHTML = '<ul>';
    for(let i = 0; i < input_file.files.length; i++){
        image_list.innerHTML += '<li class="imageList-list">'
            + input_file.files.item(i).name + 
            '<span onclick="removeImage()" id="imageFl" class="material-symbols-outlined" style="font-size: 15px;">' 
                + 'close' + 
            '</span>'
        '</li>';
    }
    image_list.innerHTML += '</ul>'
});

function removeImage() {
    input_file.value = null;
    image_list.innerHTML = null;
}