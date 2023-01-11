var adm = window.parent.document.getElementById("showModal");
var userNameProfile = document.getElementById("userNameProfile");
var userUserProfile = document.getElementById("userUserProfile");
var userEmailProfile = document.getElementById("userEmailProfile");
var userPassProfile = document.getElementById("userPassProfile");
var userConfirmPassProfile = document.getElementById("userConfirmPassProfile");
var submitUserProfile = document.getElementById("submitUserProfile");

const user_id_profile = localStorage.getItem("id_session");

async function updateProfile(){
    await fetch(`http://localhost:8080/users/${user_id_profile}`, {
        headers:{
            "Authorization":"Bearer "+getCookie("usr_tkn")
        },
        method:"GET",
        mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
        userNameProfile.value = data.userName;
        userUserProfile.value = data.name;
        userEmailProfile.value = data.email;
    })
}

adm.addEventListener("click", function(){
    updateProfile();
})

submitUserProfile.addEventListener("click", async function(){
    if(userPassProfile.value.length > 1 || userConfirmPassProfile.value.length > 1){
        if(userPassProfile.value != userConfirmPassProfile.value){
            console.log("As senhas digitadas não coincidem");
        }else{
            console.log("Requisição Enviada(com password)");
        }
    }else{
        console.log("Campos vazios(sem password)");
        updateUserData(user_id_profile, userNameProfile.value, userUserProfile.value, userEmailProfile.value);
    }
})

async function updateUserData(userId, userName, userUser, userEmail){
    console.log("Requisição Enviada OUT");
    try {
        await fetch(`http://localhost:8080/users/${userId}`, {
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "Authorization": "Bearer " + getCookie("usr_tkn")
            },
            method:"PUT",
            mode: "cors",
            body: JSON.stringify({
                userName: userName,
                name: userUser,
                email: userEmail
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
    } catch (error) {
        console.log(error)
    }
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