//use of route source: https://www.youtube.com/watch?v=GkH_VeAeur8

import { React, Component} from 'react';
import { Button, Text, TextInput, SafeAreaView } from 'react-native';

export default function Signup({navigation, route}){

    const creationBody = {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    }

    const signUpUser = async () => {       
        let response = await fetch('http://localhost:3001/users/createUser', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(creationBody)
        }).then(function(resp){
            return resp.json()
        })
        console.log(response)
    }

    return(
        <SafeAreaView>
            <Text id = 'fnameL'>First Name: </Text>
            <TextInput onChangeText={text => creationBody.firstname = text} id = 'fName'></TextInput>

            <Text id = 'lnameL'>Last Name: </Text>
            <TextInput onChangeText={text => creationBody.lastname = text} id = 'lName'></TextInput>

            <Text id = 'emailL'>Email: </Text>
            <TextInput onChangeText={text => creationBody.email = text} id = 'emailI'></TextInput>

            <Text id = 'unameL'>Username: </Text>
            <TextInput onChangeText={text => creationBody.username = text} id = 'uName'></TextInput>

            <Text id = 'pwL'>Password: </Text>
            <TextInput onChangeText={text => creationBody.password = text} id = 'pw'></TextInput>

            <Button title = "Sign Up" onPress = {() => signUpUser()} />
        </SafeAreaView>
    )
}