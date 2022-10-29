var get_id_asks;
var get_answers;
var get_answers_content;
var get_answers_userName;
var get_answers_moment;

async function setIdAsk(e){
    await fetch('http://localhost:8080/modules/departments/asks', {
        headers: {
            "Authorization" : "Bearer " + getCookie("usr_tkn")
        },
        mode: "cors",
        method: "GET"
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log("id kk" + e);
        for(let i = 0; i <= data.length; i++){
            get_id_asks = data[i].id;
            get_answers = data[i].answers
            if(e == get_id_asks){
                console.log("ask nº"+get_id_asks);
                console.log(get_answers);
            }
            for(let c = 0; c <= get_answers.length; c++){
                get_answers_content = data[i].answers[c]
                if(e == get_id_asks){
                    console.log(get_answers_content.content);
                }
            }
        }
    })
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
