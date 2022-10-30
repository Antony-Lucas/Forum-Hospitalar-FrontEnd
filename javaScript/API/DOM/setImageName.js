let input_file = document.getElementById("image-button");
let image_list = document.getElementById("imageList");
let remove_image = document.getElementById('imageFl');

let input_answer_file = document.getElementById("image-answer-button");
let image_answer_list = document.getElementById("imageListAnswer");
let remove_answer_image = document.getElementById('imageFl');

input_file.addEventListener('change', function(){
    image_list.innerHTML = '<ul>';
    for(let i = 0; i < input_file.files.length; i++){
        image_list.innerHTML += '<li class="imageList-list">'
            + "<span class='image-label'>" + input_file.files.item(i).name + "</span>" + 
            '<span onclick="removeImage()" id="imageFl" class="material-symbols-outlined" style="font-size: 15px;">' 
                + 'close' + 
            '</span>'
        '</li>';
    }
    image_list.innerHTML += '</ul>'
});

input_answer_file.addEventListener('change', function(){
    image_answer_list.innerHTML = '<ul>';
    for(let i = 0; i < input_answer_file.files.length; i++){
        image_answer_list.innerHTML += '<li class="imageList-list-answers">'
            + "<span class='image-label'>" + input_answer_file.files.item(i).name + "</span>" + 
            '<span onclick="removeAnswerImage()" id="imageFl" class="material-symbols-outlined" style="font-size: 15px;">' 
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

function removeAnswerImage(){
    input_answer_file.value = null;
    image_answer_list.innerHTML = null;
}