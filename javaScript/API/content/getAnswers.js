var get_id_asks;
var get_ask_username;
var get_ask_content;
var get_ask_moment;

var get_answers;
var get_answers_userName;
var get_answers_content;
var get_answers_moment;

async function setIdAsk(e){
    updateDiv();
    await fetch('http://localhost:8080/modules/departments/asks', {
        headers: {
            "Authorization" : "Bearer " + getCookie("usr_tkn")
        },
        mode: "cors",
        method: "GET"
    }).then(response => {
        return response.json()
    }).then(data => {
        for(let i = 0; i <= data.length; i++){
            get_id_asks = data[i].id;
            get_ask_username = data[i].userName.userName
            get_ask_content = data[i].content;
            get_ask_moment = data[i].moment;

            get_answers = data[i].answers

            if(e == get_id_asks){
                var answersContent = document.getElementById("answersContent");
                var answersContainer = document.getElementById("recentlyAnswers");
                
                var mainAsk = document.getElementById("mainAskDiv");
                var mainAnswers = document.getElementById("answerChildrens");

                var askElement = document.createElement("div");
                var answerElement = document.createElement("div");
                var answerRecent = document.createElement("p");
                var newAnswer = document.createElement("div");

                mainAsk.appendChild(askElement);
                askElement.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="answers-header-content">
                        <span class="material-symbols-outlined">account_circle</span>
                        <div class="answers-body-content">
                        <h4>${get_ask_username}</h4>
                        <p>${get_ask_content}</p>
                        <p>${get_ask_moment}</p>
                        </div>
                    </div>`
                )

                answersContainer.appendChild(answerRecent);
                answerRecent.insertAdjacentHTML(
                    "afterbegin",
                    `<p id="answersRecently" class="answer-body-recently">Recentes</p>`
                );

                answersContent.appendChild(newAnswer);
                newAnswer.insertAdjacentHTML(
                    "afterbegin",
                    `
                    <div id="imageListAnswer"></div>  
                    <div id="newAnswer" class="add-answer">
                        <label for="image-answer-button"><span class="material-symbols-outlined" style="font-size: 20px">photo_camera</span></label>
                        <input id="image-answer-button" class="add-answer-image" type="file" accept="image/png, image/gif, image/jpeg">       
                        <textarea id="answerContent" cols="60" rows="1" placeholder="Escreva um comentário..."></textarea>
                        <div class="add-answer-buttons">
                            <div class="add-answer-buttons-container">
                                <a onclick="setIdAnswer(${get_id_asks});" id="submitAnswer" type="button" class="add-answers-submit">Enviar</a>               
                            </div>
                        </div>
                    </div>
                    `
                )
            }

            for(let c = 0; c <= get_answers.length; c++){
                get_answers_userName = data[i].answers[c];
                get_answers_content = data[i].answers[c];
                get_answers_moment = data[i].answers[c];
                if(e == get_id_asks){
                    mainAnswers.appendChild(answerElement);
                    answerElement.insertAdjacentHTML(
                        "beforeend",
                        `<div class="answers-header-content">
                            <span class="material-symbols-outlined">account_circle</span>
                            <div class="answers-body-content">
                            <h4>${get_answers_userName.userName.userName}</h4>
                            <p>${get_answers_content.content}</p>
                            <p>${get_answers_moment.moment}</p>
                            </div>
                        </div>`
                    )
                }
            }
        }
    })
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