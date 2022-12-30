async function answersEdit(e, arg){
    const context_menu = document.querySelector(".wrapperA");
    const context_id = document.getElementById("wrapperAnswers");
    const answerChildrens = document.getElementById("answerChildrens");
    const delete_answers = document.getElementById("excludeAnswers");
    const edit_answers = document.getElementById("editAnswers");
    const modal_exclude_answers = document.getElementById("myModalA");
    const modal_edit = document.getElementById("myModalEditAnswers");
    const buttonExclude = document.getElementById("butonExcludeAnswers");
    const buttonUpdate = document.getElementById("butonSaveAnswers");
    const textAreaEdit = document.getElementById("answersEditContent");
    const managementId = localStorage.getItem("management_session");
    const submitAnswer = document.getElementById("submitAnswer");
    const answerContainer = document.getElementById("answersContainer");
    const name_id = localStorage.getItem("name_session"); 
    const date_get = new Date();
    var getTime = date_get.toLocaleString();

    var arr = [];
    var askArr = [];
    var attArrId = [];

    arr = [e];
    askArr = [arg];

    console.log(arr);
    console.log(askArr);
    context_menu.style.display = "none";

    answerChildrens.addEventListener("contextmenu", ev =>{
        ev.preventDefault();
        const{clientX: mouseX, clientY: mouseY} = ev;
        
        context_id.style.left = `${mouseX}px`;
        context_id.style.top = `${mouseY}px`;
    
        var winWidth = window.innerWidth;
        var cmWidth = context_menu.offsetWidth;
        var winHeigth = window.innerHeight;
        var cmHeight = context_menu.offsetHeigth
        var x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
        var y = y > winHeigth - cmHeight ? winHeigth - cmHeight : x;
    });

    try {
        await fetch(`http://localhost:8080/modules/departments/asks/${askArr}`,{
            headers: {
                "Authorization" : "Bearer " + getCookie("usr_tkn")
            },
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i <= data.answers.length; i++){
                if(data.answers[i].id == arr){  
                    if(name_id == data.answers[i].userName.userName){
                        context_menu.style.display = "block";
                        edit_answers.addEventListener("click", async function(){
                            context_menu.style.display = "none";
                            modal_edit.style.display = "block";
                            textAreaEdit.value = data.answers[i].content;
                        })
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
    }

    /*buttonUpdate.addEventListener("click", async function(){
        fetch(`http://localhost:8080/modules/departments/asks/answers/${arr}`,{
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "Authorization" : "Bearer " + getCookie("usr_tkn")
            },
            method: "PUT",
            mode: "cors",
            body: JSON.stringify({
                content: textAreaEdit.value,
                moment: getTime,
                client: { id: depArr },
                management: { id: managementId }
            })
        }).then(response => response.json())
        .then(data => {
            attArrId = [data.id];
            const nu = depArr.shift();
            
            if(nu != undefined){
                console.log(nu);
                updateAskContent(nu);
            }

            answerContainer.style.opacity = "0.7";
            submitAnswer.style.backgroundColor = "#239037"
            setTimeout(() => {
                answerContainer.style.opacity = "1";
                submitAnswer.style.backgroundColor = "#1b6e2a";
                answerContainer.scrollTop = answerContainer.scrollHeight;
            }, 3200);
            
        })
        modal_edit.style.display = "none";
    })*/

    answerChildrens.addEventListener("click", function(){
        context_menu.style.display = "none";
    })
    
    answerChildrens.addEventListener("wheel", function(){
        context_menu.style.display = "none";
    })

    delete_answers.addEventListener("click", function(){
        console.log("dasddasdsadasdsad");
        context_menu.style.display = "none";
        modal_exclude_answers.style.display = "flex";
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