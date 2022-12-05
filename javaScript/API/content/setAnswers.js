async function setIdAnswer(e){
    const date_ = new Date();

    var user_id = localStorage.getItem("id_session");
    var user_name = localStorage.getItem("name_session");
    var management_id = localStorage.getItem("management_session");
    var content_answer = document.getElementById("answerContent").value;
    var getDate = date_.toLocaleString();

    console.log("content "+content_answer);
    console.log("moment "+getDate);
    console.log("Ask id "+e);
    console.log("user id "+user_id)
    console.log("management id "+management_id);

    try{
        await fetch("http://localhost:8080/modules/departments/asks/answers", {
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "Authorization" : "Bearer " + getCookie("usr_tkn")
            },
            mode: "cors",
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                content: content_answer,
                moment: getDate,
                asks: { id: e },
                userName: { id: user_id },
                management: { id: management_id }
            })
        }).then(response => response.json())
        var mainAnswers = document.getElementById("answerChildrens");
        var answerElement = document.createElement("div");

        mainAnswers.appendChild(answerElement);
        answerElement.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="answers-header-content">
            <span class="material-symbols-outlined">account_circle</span>
            <div class="answers-body-content">
                <h4>${user_name}</h4>
                <p class='ask-content'>${content_answer}</p>
                <p class='ask-moment'>${getDate}</p>
            </div>
        </div>
        `
        )
        document.getElementById("answerContent").value = "";
    }catch(err){
        console.log(err);
    }
}

function updateDiv()
{ 
    $( "#myModalAnswers" ).load(window.location.href + " #myModalAnswers" );
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
