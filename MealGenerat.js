import { React, useState, useEffect, useRef} from 'react';
import { Modal, Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, Button } from 'react-native';
import MealSearchModalComp from './MealSearchModalComp';

export default function WorkoutGenerat({navigation, route}){
    const [newMealData, setNewMealData] = useState(mealData) //holds all data for new meal data
    const [show, setShow] = useState(false) //variable that decides whether modal is shown
    let mealData = route.params.userData.meals //all meal data of user
    let deleteMeals = useRef([]) //useRef needs to be used or rerender would be messed up after first rerender

    useEffect(() => {
        setNewMealData(newMealData)
        console.log("NWD: " + JSON.stringify(newMealData))
    })

    const addGroup = (mutArray, arrayAdd) => {
        /**
         * USED BY MODAL AS WELL
         * Add or remove arrayAdd item from mutArray
         * @param {Array} mutArray: array to have arrayAdd item removed from or added to
         * @param {any} arrayAdd: item to be removed from or added to mutArray
         */
        
        let tmp = mutArray

        if(tmp.includes(arrayAdd)){
            tmp.splice(tmp.indexOf(arrayAdd), 1)
        }
        else{
            tmp.splice(tmp.length, 0, arrayAdd)
        }

        return tmp
    }

    const removeMeals = () => {
        /**
         * Remove exercises from newMealData that match meals in deleteMeals array (removes them from potentially added meals array and de-renders them)
         */

        
    }
    
    const addToMealData = (excArray) => { 
        /**
         * PROP FUNCTION EXCLUSIVELY FOR MODAL
         * @param {Array} excArray: array to have added to newWorkData state array
         */
        setNewMealData(prevWorkData => {
            //console.log("PREVWORKDATA: ", prevWorkData);
            let temp = [...prevWorkData]; //get prev data
            
            //MAPPING BETTER FOR TRANSFORMING, FOR EACH BETTER FOR MUTATING
            excArray.forEach(excData => { //for each item of exercise data
                if(!temp.some(data => data.exerciseItem.id === excData.id)){ //if data is not already in workoutGenerat exc list
                    temp.push({exerciseItem: excData, sets: 0, reps: 0}) //add to list
                }
            });

            console.log(temp)
            return temp; //return temp to set NWD to temp list
        })
    }

    const saveMeals = async () => {
        

    }

    return(
        <SafeAreaView>
            <Button title = "Add Meals" onPress = {() => setShow(true)} />
            <Button title = "Trash Icon Here" onPress = {() => removeMeals()} />
            <Button title = "Save Meals" onPress = {() => saveMeals()} />
            <Button title = "Cancel Additions" onPress = {() => {}}></Button>
            <View style = {{height: 400}}>
                <FlatList data = {newMealData + mealData} keyExtractor={item => item.meal.id} renderItem={({item})=>(
                    <ExerciseInfo addToSelected = {() => {console.log('setting deleteMeals to: '); deleteMeals.current = addGroup(deleteMeals.current, item.exerciseItem.id); console.log('deleteExcs now set to', deleteExcs.current);}} exerciseData = {item.exerciseItem}/>)}>
                </FlatList>
            </View>
            <View style = {{
                //source: https://reactnative.dev/docs/modal
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'}}>
            <Modal transparent = {true} visible = {show}>
                <MealSearchModalComp addToMealData = {addToMealData} addFunc = {addGroup} setShow = {setShow} />
            </Modal>
            </View>
        </SafeAreaView>
    )
}