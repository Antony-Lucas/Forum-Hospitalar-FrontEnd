var mainMenu = document.getElementById("mainMenu");
var mainModal = document.getElementById("myMainModal");
var modal = document.getElementById("myModal");
var modalAttendance = document.getElementById("myModalAttendance");

var closeModalAtt = document.getElementById("closeModalAttendance");

function openMainModal(){
    mainModal.style.display = "block";
}

function closeMainModal(){
    mainModal.style.display = "none";
}

function openModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

function openModalAttendance(){
    modalAttendance.style.display = "block";
    mainMenu.style.display = "block"
}

function closeModalAttendance(){
    modalAttendance.style.display = "none";
    mainMenu.style.display = "none";
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }

    if(event.target == mainModal){
        mainModal.style.display = "none"
    }
}