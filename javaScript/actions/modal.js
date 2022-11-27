var header = document.getElementById("headerLogo");
var mainMenu = document.getElementById("mainMenu");
var mainModal = document.getElementById("myMainModal");
var modal = document.getElementById("myModal");
var answerModal = document.getElementById("answerModal");
var modalAttendance = document.getElementById("myModalAttendance");
var closeModalAtt = document.getElementById("closeModalAttendance");
var tabCont = document.getElementById("tabContent");

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

function openModaModules(e){
    tabCont.innerText = e;
    modalAttendance.style.display = "block";
    header.style.visibility = "hidden";
}

function closeModalModules(){
    modalAttendance.style.display = "none";
    header.style.visibility = "visible";
}

function openAnswersModal(){
    
}

function closeAnswerModal(){
    answerModal.style.display = "none"
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }

    if(event.target == mainModal){
        mainModal.style.display = "none"
    }
    if(event.target == answerModal){
        answerModal.style.display = "none"
    }
}