var module_id = [];
var dep_id = [];
var dep_name = [];

var attendance = window.parent.document.getElementById("atendimento");
var assistant = window.parent.document.getElementById("assistencial");
var support = window.parent.document.getElementById("apoio");
var controllership = window.parent.document.getElementById("controladoria");
var invoicing = window.parent.document.getElementById("faturamento");
var finance = window.parent.document.getElementById("financeiro");
var management = window.parent.document.getElementById("gerencial");
var hospitally = window.parent.document.getElementById("hotelaria");
var sadt = window.parent.document.getElementById("sadt");
var supplies = window.parent.document.getElementById("suprimentos");
var modal_adm = window.parent.document.getElementById("showModal");
var tabCont = window.parent.document.getElementById("tabContent");

var modal_attendance = document.getElementById("attendance");
var modal_assistant = document.getElementById("assistant");
var modal_support = document.getElementById("support");
var modal_controllership = document.getElementById("controllership");
var modal_invoicing = document.getElementById("invoicing");
var modal_finance = document.getElementById("finance");
var modal_management = document.getElementById("management");
var modal_hospitally = document.getElementById("hospitally");
var modal_sadt = document.getElementById("sadt");
var modal_supplies = document.getElementById("supplies");

var body_dep_of = document.getElementById("bodyDep");
var body_asks_of = document.getElementById("bodyAsks");
var body_answers_of = document.getElementById("bodyAnswers");
var body_adm_of = document.getElementById("bodyAdm");
var body_activity = document.getElementById("bodyactivity");

async function getdepartment(e){
    console.log(e);
    try {
        await fetch('http://localhost:8080/modules/departments', {
            headers: {
                'Authorization':'Bearer '+ getCookie("usr_tkn")
            },
            mode: 'cors',
            method: 'GET'
        }).then(response => {
            return response.json();;
        }).then(data => {
            for(let i = 0; i < data.length; i++){
                module_id = data[i].modules.id;
                dep_name = data[i].nameDepartment;
                dep_id = data[i].id;
                if(e == module_id){ 
                    var divDep = document.getElementById("departmentsIntoModal");
                    var li = document.createElement("li");
                    divDep.appendChild(li);
                    li.insertAdjacentHTML(
                        "afterbegin",
                        `
                        <li>
                            <a id="showDepartment${dep_id}" onclick='req(${dep_id}); setAsk();' class="body-content-list-item">
                                <p>${dep_name}</p>
                                <span class="material-symbols-outlined">chevron_right</span>
                            </a>
                        </li>
                        `
                    );
                }
            }

            switch (e) {
                case 1:
                    document.querySelector(`#showDepartment51`).click();
                    break;
            
                case 2:
                    document.querySelector(`#showDepartment10`).click();
                    break;

                case 3:
                    document.querySelector(`#showDepartment18`).click();
                    break;

                case 4:
                    document.querySelector(`#showDepartment25`).click();
                    break;

                case 5:
                    document.querySelector(`#showDepartment30`).click();
                    break;

                case 6:
                    document.querySelector(`#showDepartment37`).click();
                    break;

                case 7:
                    document.querySelector(`#showDepartment44`).click();
                    break;

                case 8:
                    document.querySelector(`#showDepartment48`).click();
                    break;

                case 9:
                    document.querySelector(`#showDepartment1`).click();
                    break;

                case 10:
                    document.querySelector(`#showDepartment55`).click();
                    break;
                default:
                    break;
            }
        })
    } catch (error) {
        console.log(error)
    }
}

attendance.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(1)
})

modal_attendance.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Atendimento";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(1)
})

assistant.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(2)
})

modal_assistant.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Assistencial";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(2)
})

support.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(3)
})

modal_support.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Apoio";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(3)
})

controllership.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(4)
})

modal_controllership.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Controladoria";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(4)
})

invoicing.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(5)
})

modal_invoicing.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Faturamento";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(5)
})

finance.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(6)
})

modal_finance.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Financeiro";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(6)
})

management.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(7)
})

modal_management.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Gerencial";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(7)
})

hospitally.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(8)
})

modal_hospitally.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Hotelaria";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(8)
})

sadt.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(9)
})

modal_sadt.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "SADT";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(9)
})

supplies.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(10)
})

modal_supplies.addEventListener("click", function(){
    showOnBodyContent()
    tabCont.innerText = "Suprimentos";
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(10)
})

modal_adm.addEventListener("click", function(){
    showOnBodyContent()
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    showOfBodyContent()
})

function showOfBodyContent(){
    body_adm_of.style.display = "block";
    body_activity.style.display = "block";
    body_dep_of.style.display = "none";
    body_asks_of.style.display = "none";
    body_answers_of.style.display = "none";
}

function showOnBodyContent(){
    body_adm_of.style.display = "none";
    body_activity.style.display = "none";
    body_dep_of.style.display = "block";
    body_asks_of.style.display = "block";
    body_answers_of.style.display = "block";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}