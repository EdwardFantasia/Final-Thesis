import { React, useState, useEffect, useRef} from 'react';
import { Modal, Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, Button } from 'react-native';
import MealSearchModalComp from './MealSearchModalComp';
import MealInfo from './MealInfo';

export default function WorkoutGenerat({navigation, route}){
    const [newMealData, setNewMealData] = useState([]) //holds all data for new meal data
    const [show, setShow] = useState(false) //variable that decides whether modal is shown
    let mealData = route.params.userData.meals //all meal data of user (needed separate in case user cancels additions, can just leave and send this back)
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
    
    const addToMealData = (mealArray) => { 
        /**
         * PROP FUNCTION EXCLUSIVELY FOR MODAL
         * @param {Array} excArray: array to have added to newWorkData state array
         */
        setNewMealData(prevMealData => {
            //console.log("PREVWORKDATA: ", prevWorkData);
            let temp = [...prevMealData] + mealData; //get prev data and all data from old userdata (to check if any meal is already in user's meals)
            
            //MAPPING BETTER FOR TRANSFORMING, FOR EACH BETTER FOR MUTATING
            mealArray.forEach(async (mealData) => { //for each item of meal data
                if(!temp.some(data => data.id === mealData.id)){ //if data is not already in meal list
                    let tempMeal = {
                        id: mealData.id,
                        title: mealData.title,
                        summary: mealData.summary,
                        instructions: mealData.instructions,
                        readyInMinutes: mealData.readyInMinutes,
                        imageType: mealData.imageType,
                        servings: mealData.servings,
                        ingredients: [],
                        equipment: []
                    }
                    
                    let tempIngred = {}

                    for (let i = 0; i < mealData.extendedIngredients.length; i++){ //get name and image (different names sometimes from name) for each ingredient, put that data in tempMeal array
                        tempIngred = {
                            name: mealData.extendedIngredients[i].name,
                            image: mealData.extendedIngredients[i].image
                        }
                        tempMeal.ingredients.push(tempIngred)
                    }

                    let tempEquip = {}
                    let instructions = []
                    let steps = []

                    for(let i = 0; i < mealData.analyzedInstructions.length; i++){
                        instructions = mealData.analyzedInstructions[i]
                        for(let j = 0; j < instructions.steps.length; j++){
                            steps = instructions.steps[j]
                            for(let k = 0; k < steps.equipment.length; k++){
                                tempEquip = {
                                    name: steps[k].name,
                                    image: steps[k].image
                                }
                                tempMeal.equipment.push(tempEquip)
                            }
                        }
                    }

                    temp.push(tempMeal) //add to list
                }
            });

            console.log(temp)
            return temp; //return temp to set NMD to temp list
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
                <FlatList data = {newMealData} keyExtractor={item => item.id} renderItem={({item})=>(
                   <MealInfo mealData = {item}/>)}>
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