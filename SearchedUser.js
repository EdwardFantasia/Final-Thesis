import { TextInput, View, Text, Image, Pressable } from "react-native";

export default function SearchedUser(){
    return(
        <Pressable style = {{width: '70%', alignItems: 'center', borderStyle: "solid", borderWidth: 1, borderRadius: 10}}>
            <Image style = {{marginTop: 3, width: 165, height: 165, borderRadius: 165 / 2, overflow: "hidden", borderColor: "black", borderWidth: .6}} source = {{ uri: 'https://avatarfiles.alphacoders.com/176/thumb-176351.jpg'}}></Image>
            <Text style = {{fontSize: 18}}>JohnDoe96</Text>
        </Pressable>
    )
}