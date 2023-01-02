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

submitUserProfile.addEventListener("click", function(){
    const formDataProfile = new FormData();
    formDataProfile.append('userName:', userNameProfile.value);
    formDataProfile.append('name:', userUserProfile.value);
    formDataProfile.append('email:', userEmailProfile.value);
    console.log(console.log(...formDataProfile));
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