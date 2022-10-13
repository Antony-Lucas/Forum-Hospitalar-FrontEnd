import  {url_api}  from "../config.js";
import { email, pass, submit, user } from "./signUpErrors.js";

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
                name: user.value,
                email: email.value,
                password: pass.value
            }),
        })
        .then(
            response => {
                if(user.value == "" || pass.value == ""){
                    error_visible.style.visibility = "visible"
                    load_circle.style.visibility = 'hidden'
                    return false;
                }
                else
                {
                    response.json();
                }
            }
        )
        .then(
            data => console.log(data)
        )
    } catch (error) {
        console.log(error);
    }
});