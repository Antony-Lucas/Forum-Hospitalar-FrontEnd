var get_answers;
var get_answers_id;
var get_answers_userName;
var get_answers_content;
var get_answers_img;
var get_answers_moment;
var arr = [];

function updateAskContent(e, arr){
    setTimeout(async function(){
        $( "#answerChildrens" ).load(window.location.href + " #answerChildrens" );
        arr = [e].shift(); 
        console.log(arr);
        
        await fetch("http://localhost:8080/modules/departments/asks", {
            headers: {
                "Authorization":"Bearer " + getCookie("usr_tkn")
            },
            mode: "cors",
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i <= data.length; i++){
                if(data[i].id == e){
                    get_answers = data[i].answers;
                    var mainAnswers = document.getElementById("answerChildrens");
                    var answerElement = document.createElement("div");

                    for(let c = 0; c <= get_answers.length; c++){
                        get_answers_id = data[i].answers[c];
                        get_answers_userName = data[i].answers[c];
                        get_answers_content = data[i].answers[c];
                        get_answers_img = data[i].answers[c];
                        get_answers_moment = data[i].answers[c];

                        if(e == data[i].id){
                            mainAnswers.appendChild(answerElement);
                            answerElement.insertAdjacentHTML(
                                "beforeend",
                                `<div class="answers-header-content" id="answerId${get_answers_id.id}" oncontextmenu="answersEdit(${get_answers_id.id}, ${e})">
                                    <span class="material-symbols-outlined">account_circle</span>
                                    <div class="answers-body-content">
                                    <h4>${get_answers_userName.userName.userName}</h4>
                                    <p class='ask-content'>${get_answers_content.content}</p>
                                    <img class='img-answer' id="imgDisplay${c}" src="${get_answers_img.imageUrl}">
                                    <p class='ask-moment'>${get_answers_moment.moment}</p>
                                    </div>
                                </div>`
                            )
                            var getImg = document.getElementById(`imgDisplay${c}`);
                            if(get_answers_img.imageUrl == null || get_answers_img.imageUrl == ""){
                                getImg.style.display = "none";
                            }
                        }
                    }
                }
            }
        });
    }, 3400);
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