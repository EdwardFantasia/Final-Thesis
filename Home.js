import { React, Component, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Workout from './Workout';
import { SafeAreaView, View, Image, Text, Switch, StyleSheet, TouchableOpacity, FlatList, Button} from 'react-native';
import ExerciseInfo from './ExerciseInfo';
import CollapsibleView from "@eliav2/react-native-collapsible-view";

export default function Home({navigation, route}){
    const [dataBool, setDataBool] = useState('workouts')
    
    const [data, setData] = useState(route.params.userData) //holds username, meals, pfp, and workouts

    useFocusEffect(() => {
        if(navigation.isFocused()){
            setData(route.params.userData)
            console.log(route.params.userData)
        }
    })

    return(
        <SafeAreaView>
            <Text>Insert PFP</Text>
            <Text>{data.username}</Text>
            <View style = {{flexDirection: 'row'}}>
                <Text>Workouts  </Text>
                    <Switch trackColor={'#f4f3f4'} thumbColor={'#2196F3'} value = {dataBool} onValueChange={() => {setDataBool(dataBool == 'workouts' ? 'meals':'workouts')}}/>
                <Text>  Recipe Book</Text>
                {data["workouts"].map(workout => {
                    return(
                        <Button onPress = {() => {console.log(workout)}}></Button>
                    )
                })}
            </View>

            <Button title = "Add Workouts" onPress = {() => {navigation.navigate("WorkoutGen", {userData: data})}}></Button>
        </SafeAreaView>
    )

    const style = StyleSheet.create({
        
    })
}