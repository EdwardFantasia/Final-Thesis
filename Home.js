import { React, Component, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Workout from './Workout';
import { Modal, SafeAreaView, View, Image, Text, Switch, StyleSheet, TouchableOpacity, FlatList, Button, Dimensions} from 'react-native';
import MealInfo from './MealInfo.js'
import ExerciseInfo from './ExerciseInfo';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import AppNav from "./AppNav.js"
import ExerciseTabInfo from './ExerciseTabInfo.js';
import MealTabInfo from './MealTabInfo.js'

export default function Home({navigation, route}){
    const [dataBool, setDataBool] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [data, setData] = useState(route.params.userData) //holds username, meals, pfp, and workouts
    const [modalShow, setModalShow] = useState(false)
    const [modalData, setModalData] = useState({})

    const modalDisplayExc = async function(exerciseID){
        const exercise = await fetch('http://10.0.2.2:3443/exercises/getExercise/' + exerciseID, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'}
        }).then(function(resp){
            return resp.json()
        })
        console.log('exercise: ' + JSON.stringify(exercise))

        setModalData(exercise)
        setModalShow(true)
    }

    const modalDisplayMeal = async function(mealID){
        const meal = await fetch('http://10.0.2.2:3443/meals/getMeal/' + mealID, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'}
        }).then(function(resp){
            return resp.json()
        })

        console.log('meal ' + JSON.stringify(meal))

        setModalData(meal)
        setModalShow(true)
    }

    useFocusEffect(() => {
        if(navigation.isFocused()){
            setData(route.params.userData)
            console.log('in home: ' + JSON.stringify(route.params.userData))
        }
    })

    return(
        <SafeAreaView style = {{paddingTop: "15%", height: Dimensions.get('screen').height}}>
            <View style = {{alignItems: "center"}}>
                <Image style = {{width: 165, height: 165, borderRadius: 165 / 2, overflow: "hidden", borderColor: "black", borderWidth: .6}} source = {{ uri: data.picture }} />
                <Text style = {{fontWeight: 'bold', fontSize: 18}}>{data.username}</Text>
                <View style = {{marginLeft: Dimensions.get('screen').width * .05, flexDirection: 'row'}}>
                    <Text style = {{marginTop: Dimensions.get('screen').height * .015}}>Workouts </Text>
                        <Switch trackColor={'#f4f3f4'} thumbColor={'#2196F3'} value = {dataBool} onValueChange={() => {setDataBool(!dataBool)}}/>
                    <Text style = {{marginTop: Dimensions.get('screen').height * .015}}> Recipe Book</Text>
                </View>
                <View style = {{marginVertical: 1, height: Dimensions.get('screen').height * .53}}>
                        {!dataBool &&
                            <FlatList data = {data["workouts"]} keyExtractor={item => item._id} renderItem={({item})=>(
                                <Workout modalDisplay = {modalDisplayExc} workout={item}/>
                            )} />
                        }
                        {dataBool &&
                            <FlatList data = {data["meals"]} keyExtractor={item => item._id} renderItem={({item})=>(
                                <MealInfo modalDisplay = {modalDisplayMeal} hideViewMore = {false} hideCheck = {true} mealData = {item}/>
                            )} />
                        }
                    </View>
                <View style = {{
                //source: https://reactnative.dev/docs/modal
                flex: 1,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center'}}>
                    <Modal transparent = {true} visible = {modalShow}>
                        {!dataBool &&
                            <ExerciseTabInfo setModalShow = {setModalShow} exercise = {modalData}/>
                        }
                        {dataBool &&
                            <MealTabInfo setModalShow = {setModalShow} meal = {modalData}/>
                        }
                    </Modal>
                </View>
            </View>
            <View style = {{bottom: 0}}>
                <AppNav userData = {data} navigation = {navigation}/>
            </View>
        </SafeAreaView>
    )

    const style = StyleSheet.create({
        
    })
}