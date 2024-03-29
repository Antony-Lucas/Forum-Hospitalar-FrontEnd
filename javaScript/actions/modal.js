var header = document.getElementById("headerLogo");
var mainMenu = document.getElementById("mainMenu");
var mainModal = document.getElementById("myMainModal");
var modalEdit = document.getElementById("myModalEdit");
var modal = document.getElementById("myModal");
var modalEditAnswers = document.getElementById("myModalEditAnswers");
var modalAnswers = document.getElementById("myModalA");
var answerModal = document.getElementById("answerModal");
var modalAttendance = document.getElementById("myModalAttendance");
var closeModalAtt = document.getElementById("closeModalAttendance");
var tabCont = document.getElementById("tabContent");
var myModalView = document.getElementById("myModalView");

function openMainModal(){
    mainModal.style.display = "block";
}

function closeMainModal(){
    mainModal.style.display = "none";
}

function openModal(){
    modal.style.display = "flex";
}

function closeModal(){
    modal.style.display = "none";
}

function openModalEdit(){
    modalEdit.style.display = "flex";
}

function closeModalEdit(){
    modalEdit.style.display = "none";
}

function openModalAnswers(){
    modalAnswers.style.display = "flex";
}

function closeModalAnswers(){
    modalAnswers.style.display = "none";
}

function openModalEditAnswers(){
    modalEditAnswers.style.display = "flex";
}

function closeModalEditAnswers(){
    modalEditAnswers.style.display = "none";
}

function openModalView(){
    myModalView.style.display = "flex"
}

function closeModalView(){
    myModalView.style.display = "none";
}

function openModaModules(e){
    tabCont.innerText = e;
    modalAttendance.style.display = "block";
    header.style.visibility = "hidden";
}

function closeModalModules(){
    modalAttendance.style.display = "none";
    header.style.visibility = "visible";
}

function closeAnswerModal(){
    answerModal.style.display = "none"
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }

    if(event.target == modalAnswers){
        modalAnswers.style.display = "none";
    }

    if(event.target == mainModal){
        mainModal.style.display = "none"
    }

    if(event.target == answerModal){
        answerModal.style.display = "none"
    }

    if(event.target == modalEdit){
        modalEdit.style.display = "none"
    }

    if(event.target == modalEditAnswers){
        modalEditAnswers.style.display = "none"
    }

    if(event.target == myModalView){
        myModalView.style.display = "none"
    }
}