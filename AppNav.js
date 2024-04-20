import { Image, Pressable, Text, View } from 'react-native';

//Source: https://www.youtube.com/watch?v=LJkOGLhyRCg

export default function AppNav(navigation, route){
    return(
        <View style = {{position: 'absolute', flexDirection: "row", bottom: -225}}>
            <Pressable style = {{flex: 1}}>
                <View style = {{alignItems: "center"}}>
                    <Image source = {require('./assets/navIcons/homeNav.png')} />
                    <Text>Home</Text>
                </View>
            </Pressable>
            <Pressable style = {{flex: 1}}>
                <View style = {{alignItems: "center"}}>
                    <Image source = {require("./assets/navIcons/dbIcon.png")}/>
                    <Text style = {{textAlign: "center"}}>Add to Workouts</Text>
                </View>
            </Pressable>
            <Pressable style = {{flex: 1}}>
                <View style = {{alignItems: "center"}}>
                    <Image source = {require("./assets/navIcons/mealIcon.png")}/>
                    <Text style = {{textAlign: 'center'}}>Add to Recipebook</Text>
                </View>
            </Pressable>
            <Pressable style = {{flex: 1}}>
                <View style = {{alignItems: "center"}}>
                    <Image source = {require("./assets/navIcons/searchIcon.png")}/>
                    <Text style = {{textAlign: 'center'}}>Search{"\n"} Users</Text>
                </View>
            </Pressable>
        </View>
    )
}