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
                            <a id="showDepartment" onclick='req(${dep_id}); setAsk();' class="body-content-list-item">
                                <p>${dep_name}</p>
                                <span class="material-symbols-outlined">chevron_right</span>
                            </a>
                        </li>
                        `
                    );
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

attendance.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(1)
})

assistant.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(2)
})

support.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(3)
})

controllership.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(4)
})

invoicing.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    $( "#bodyAsks" ).load(window.location.href + " #bodyAsks" );
    getdepartment(5)
})

finance.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(6)
})

management.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(7)
})

hospitally.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(8)
})

sadt.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(9)
})

supplies.addEventListener("click", function(){
    $( "#deparmentsBloc" ).load(window.location.href + " #deparmentsBloc" );
    getdepartment(10)
})




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