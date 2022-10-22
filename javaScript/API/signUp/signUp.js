import  {url_api}  from "../config.js";
import { email, error_auth, error_empty_field, links, load_circle, pass, signUp_modal, submit, user, userName } from "./signUpErrors.js";
let catch_id;
submit.addEventListener('click', async function(){
    try {
        await fetch(url_api + '/users', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName.value,
                name: user.value,
                email: email.value,
                password: pass.value
            }),
        })
        .then(
            response => {
                if(response.status == 201 || response.status == 200){
                    signUp_modal.style.display = "flex";
                    load_circle.style.visibility = 'hidden'
                    return response.json();
                }
                if(userName == "" || user.value == "" || email.value == "" || pass.value.length == ""){
                    error_empty_field.style.visibility = "visible"
                    load_circle.style.visibility = 'hidden'
                    return false;
                }
                else
                {
                    return response.json();
                }
            }
        )
        .then(
            data => {
                if(data.status == 400){
                    error_empty_field.style.visibility = "visible";
                    load_circle.style.visibility = 'hidden'
                    links.style.top = "35px";
                    error_auth.innerHTML = "Usuário ou Email já em uso";
                }
                else{
                    console.log("200");
                }
                catch_id = data
                return console.log(data);
            }
        )
        catch_id;
        await fetch(url_api + '/management', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: catch_id
            }),
        })
        .then(
            response => {
                return console.log(response.json());
            }
        )
        .then(
            data => {
                return console.log(data);
            }
        )
    } catch (error) {
        console.log(error);
    }
});