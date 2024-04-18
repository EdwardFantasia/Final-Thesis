//use of route source: https://www.youtube.com/watch?v=GkH_VeAeur8

import { React, useRef, useState} from 'react';
import { Image, Button, Text, TextInput, SafeAreaView } from 'react-native';
import { firebaseStorage } from './firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'

export default function Signup({navigation, route}){

    const creationBody = useRef({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        picture: "https://firebasestorage.googleapis.com/v0/b/exercise365-5b879.appspot.com/o/blankpfp.png?alt=media&token=7f4c7abd-adae-4363-ba3d-cbbf76c81de3"
    })

    const [pfp, setPfp] = useState('https://firebasestorage.googleapis.com/v0/b/exercise365-5b879.appspot.com/o/blankpfp.png?alt=media&token=7f4c7abd-adae-4363-ba3d-cbbf76c81de3') //initial pfp uploaded to firebase based on picture from: https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png

    const pfpSelect = async() => { //https://youtu.be/1F8wquqFIaQ?si=a7M67oOrqbfCk4Cn
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        })

        if(!result.canceled){
            //TODO: set alert catch for if image is above (determined pixel size)
            setPfp(await result.uri)
        }
    }

    const signUpUser = async() => {  
        //TODO: create firebase auth code that, if activated, then executes code below
        
        let response = await fetch('http://10.0.2.2:3443/users/createUser', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(creationBody.current)
        }).then(async function(resp){
            let tempResp = resp.json()
            let url = pfp
            if(url != 'https://firebasestorage.googleapis.com/v0/b/exercise365-5b879.appspot.com/o/blankpfp.png?alt=media&token=7f4c7abd-adae-4363-ba3d-cbbf76c81de3'){
                console.log('activated')
                const pfpFetch = await fetch(url);
                const blob = await pfpFetch.blob();

                // Create image reference
                const imageRef = ref(firebaseStorage, `images/${creationBody.current.username.toLowerCase()}`);

                // Upload blob to Firebase Storage
                const pic = await uploadBytes(imageRef, blob)

                url = await getDownloadURL(imageRef)
            }

            tempResp = tempResp["_j"]

            tempResp.picture = await fetch('http://10.0.2.2:3443/users/setPic', {
                method: 'PATCH',
                mode: 'cors',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({username: creationBody.current.username, picUrl: url})
            }).then(urlResp => {
                console.log(JSON.stringify(urlResp))
                if(urlResp.status === 200){
                    console.log('worked')
                    return url
                }
                console.log('setting to blank')
                return "https://firebasestorage.googleapis.com/v0/b/exercise365-5b879.appspot.com/o/blankpfp.png?alt=media&token=7f4c7abd-adae-4363-ba3d-cbbf76c81de3"
            })
            return tempResp
        })
        .catch(err => {
            console.log(err)
        })

        navigation.navigate('Home', {userData: response})
    }

    return(
        <SafeAreaView>
            <Image style = {{width: 150, height: 150}} source = {{ uri: pfp }}></Image>
            <Button title = "Choose Profile Picture" onPress = {() => pfpSelect()}></Button>

            <Text id = 'fnameL'>First Name: </Text>
            <TextInput onChangeText={text => creationBody.current.firstname = text} id = 'fName'></TextInput>

            <Text id = 'lnameL'>Last Name: </Text>
            <TextInput onChangeText={text => creationBody.current.lastname = text} id = 'lName'></TextInput>

            <Text id = 'emailL'>Email: </Text>
            <TextInput onChangeText={text => creationBody.current.email = text} id = 'emailI'></TextInput>

            <Text id = 'unameL'>Username: </Text>
            <TextInput onChangeText={text => creationBody.current.username = text} id = 'uName'></TextInput>

            <Text id = 'pwL'>Password: </Text>
            <TextInput onChangeText={text => creationBody.current.password = text} id = 'pw'></TextInput>

            <Button title = "Sign Up" onPress = {() => signUpUser()} />
        </SafeAreaView>
    )
}