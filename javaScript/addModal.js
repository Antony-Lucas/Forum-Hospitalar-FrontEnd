var modal = document.getElementById("myModal");
var addModal = document.getElementById("addModal");
var addButton = document.getElementById("showAddModal");
var addSpan = document.getElementsByClassName("addClose")[0];

addButton.onclick = function(){
    addModal.style.display = "block";
}

addSpan.onclick = function(){
    addModal.style.display = "none";
}

window.onclick = function(event){
    if(event.target == addModal || event.target == modal){
        addModal.style.display = "none"
        modal.style.display = "none";
    }
}