//use of route source: https://www.youtube.com/watch?v=GkH_VeAeur8

import { React, Component} from 'react';

export default function Signup({navigation, route}){

    const signUpUser = async (username, fName, lName, email, pass) => {       
        const body = {
            username: username,
            firstname: fName,
            lastname: lName,
            email: email,
            password: pass
        }
    
        let response = await fetch('http://localhost:3001/createUser', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(body)
        }).then(function(resp){
            return resp.json()
        })
        console.log(response)
    }

    return(
        <div>
            <label id = 'fnameL'>First Name: </label>
            <input type = 'text' id = 'fName' className = 'signup'></input>
            <br />
            <label id = 'lnameL'>Last Name: </label>
            <input type = 'text' id = 'lName' className = 'signup'></input>
            <br />
            <label id = 'emailL'>Email: </label>
            <input type = 'text' id = 'emailI' className = 'signup'></input>
            <br />
            <label id = 'unameL'>Username: </label>
            <input type = 'text' id = 'uName' className = 'signup'></input>
            <br />
            <label id = 'pwL'>Password: </label>
            <input type = 'text' id = 'pw' className = 'signup'></input>
            <button onClick = {() => signUpUser(document.getElementById('uName').value, document.getElementById('fName').value, document.getElementById('lName').value, document.getElementById('emailI').value, document.getElementById('pw').value)}>Sign Up</button>
        </div>
    )
}