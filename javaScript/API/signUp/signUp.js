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
            response => response.json()
        )
        .then(
            data => console.log(data)
        )
    } catch (error) {
        console.log(error);
    }
});