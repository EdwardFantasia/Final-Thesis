//use of route source: https://www.youtube.com/watch?v=GkH_VeAeur8

import { React, useState} from 'react';
import { Image, Button, Text, TextInput, SafeAreaView } from 'react-native';
import { firebaseStorage } from './firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'

export default function Signup({navigation, route}){

    const creationBody = {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        pfp: ""
    }

    const [pfp, setPfp] = useState('https://firebasestorage.googleapis.com/v0/b/exercise365-5b879.appspot.com/o/blankpfp.png?alt=media&token=7f4c7abd-adae-4363-ba3d-cbbf76c81de3') //initial pfp uploaded to firebase based on picture from: https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png

    const pfpSelect = async() => { //https://youtu.be/1F8wquqFIaQ?si=a7M67oOrqbfCk4Cn
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        })

        if(!result.canceled){
            setPfp(await result.uri)
        }
    }

    const signUpUser = async() => {  
        //TODO: create firebase auth code that, if activated, then executes code below
        
        //TODO: create image link
        const pfpFetch = await fetch(pfp);
        const blob = await pfpFetch.blob();

        // Create image reference
        const imageRef = ref(firebaseStorage, `images/${creationBody.username.toLowerCase()}`);

        // Upload blob to Firebase Storage
        const url = await uploadBytes(imageRef, blob) //WORKS

        let response = await fetch('http://10.0.2.2:3443/users/createPic', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(creationBody)
        }).then(async function(resp){
            let tempResp = resp.json()
            if(pfp != 'https://firebasestorage.googleapis.com/v0/b/exercise365-5b879.appspot.com/o/blankpfp.png?alt=media&token=7f4c7abd-adae-4363-ba3d-cbbf76c81de3'){

                console.log("url: ", url)

                {/*tempResp.picture = await fetch('http://10.0.2.2:3443/users/modPic', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify({picUrl: url.toString()})
                }).then(resp => {
                    if(resp.picUrl){
                        return resp.picUrl
                    }
                    return
                })*/}
            }
            
            return tempResp
        })
        .catch(err => {
            console.log(err)
        })

        {/*console.log("Navigating")

    navigation.navigate('Home', {userData: response})*/}
    }

    return(
        <SafeAreaView>
            <Image style = {{width: 150, height: 150}} source = {{ uri: pfp }}></Image>
            <Button title = "Choose Profile Picture" onPress = {() => pfpSelect()}></Button>

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