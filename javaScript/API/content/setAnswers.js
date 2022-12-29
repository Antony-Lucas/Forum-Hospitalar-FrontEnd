async function setIdAnswer(e){
    const date_ = new Date();

    var user_id = localStorage.getItem("id_session");
    var user_name = localStorage.getItem("name_session");
    var management_id = localStorage.getItem("management_session");
    var content_answer = document.getElementById("answerContent").value;
    var getDate = date_.toLocaleString();
    var setAnswerImage = document.getElementById("image-answer-button");
    var image_url = "";
    let input_answer_file = document.getElementById("image-answer-button");
    let image_answer_list = document.getElementById("imageListAnswer");

    console.log("content "+content_answer);
    console.log("moment "+getDate);
    console.log("Ask id "+e);
    console.log("user id "+user_id)
    console.log("management id "+management_id);

    const formData = new FormData();
    if(setAnswerImage.files[0] != undefined){
        try {
            formData.append('file', setAnswerImage.files[0]);
            formData.append('url', 'filename');
            await fetch("http://localhost:8080/upload",{
                method: "POST",
                headers: {
                'Authorization':'Bearer ' + getCookie('usr_tkn')
            },
            body: formData
            }).then(response => response.text())
            .then(data => {
                console.log(data)
                image_url = data;
                console.log("upload: "+image_url);
            })
        } catch (error) {
            console.log(error);
        }
    }

    input_answer_file.value = null;
    image_answer_list.innerHTML = null;

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
                imageUrl: image_url,
                asks: { id: e },
                userName: { id: user_id },
                management: { id: management_id }
            })
        })
        .then(response => response.json())
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
