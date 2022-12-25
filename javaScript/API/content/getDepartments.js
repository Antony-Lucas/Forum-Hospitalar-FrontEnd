var attendance = document.getElementById("attendance");
var assistant = document.getElementById("assistant");

var dep_id = [];
var dep_name = [];

async function getdepartment(){
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
                dep_id = data[i].id;
                dep_name = data[i].nameDepartment;
  
                var divDep = document.getElementById("departments");
                var li = document.createElement("li");
                divDep.appendChild(li)
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
        })
    } catch (error) {
        console.log(error)
    }
}

function updateDiv()
{ 
    $( "#bodyAsks" ).load(location.href + "#bodyAsks" );
}

getdepartment();

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