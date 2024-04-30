import { useState } from "react";
import { TextInput, View, Text, SafeAreaView, Button } from "react-native";
import SearchedUser from "./SearchedUser";
import { Searchbar } from "react-native-paper";

export default function Search(props){
    const [userString, setUserString] = useState("")
    const [userProfiles, setUserProfiles] = useState([])
    const getUsers = async () => {
        const users = await fetch('http://10.0.2.2:3443/users/getBaseUserI/' + userString, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'}
        }).then(function(resp){
            return resp.json()
        })
        console.log(users)
        setUserProfiles(users)
    }

    const goToAccount = (userId) => {
        
    }

    return(
        <SafeAreaView style = {{paddingTop: '15%'}}>
            <View style = {{alignItems: 'center'}}>
                <Searchbar value = {userString} onChangeText = {setUserString} placeholder="Search for users..." style = {{marginHorizontal: '5%', borderStyle: "solid", borderWidth: 1, borderRadius: 10, textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0)', marginBottom: 10}} theme={{ colors: { primary: 'blue' } }} />
                <View style = {{paddingBottom: '5%', paddingTop: '3%'}}>
                    <Button title = "Search for Users" onPress = {() => getUsers()}/>
                </View>
                {userProfiles.map(user => {
                    return(
                        <SearchedUser goToAccount = {goToAccount(user.username)} smallProfData = {user} />
                    )
                })}
            </View>
        </SafeAreaView>
    )
}