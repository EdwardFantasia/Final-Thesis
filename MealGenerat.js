import { React, useState, useEffect, useRef} from 'react';
//import './css/WorkoutGen.css'
//import { Modal } from 'react-bootstrap'; //change these to react native versions
import { Modal, Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, Button } from 'react-native';

export default function MealGenerat({navigation, route}){
    const [show, changeShow] = useState(false)
    
    return(
        <SafeAreaView>
            <Button title = "Add" onPress = {() => changeShow(true)} />
            <Button title = "Delete Exercises" onPress = {() => setRM(true)} />
            <Button title = "Trash Icon Here" onPress = {() => removeExercises()} />
            <Button title = "Save Workout" onPress = {() => saveWorkout()} />

            <Text>{"\n"}</Text>
            <View style = {{
                //source: https://reactnative.dev/docs/modal
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'}}>
            <Modal transparent = {true} visible = {show}>
                <WorkoutModalComp addToWorkData = {addToWorkData} addFunc = {addGroup} setShow = {setShow}></WorkoutModalComp>
            </Modal>
            </View>
            <View style = {{flex: 1, height: "auto"}}>
                <FlatList data = {newWorkData} renderItem={({item: item, index: number}) => 
                    <View>
                        <ExerciseInfo hideCheck = {!removeMode} addToSelected = {() => {console.log('setting deleteExcs to: '); deleteExcs.current = addGroup(deleteExcs.current, item.exerciseItem.id); console.log('deleteExcs now set to', deleteExcs.current);}} exerciseData = {item.exerciseItem}/>
                        <View style = {{flexDirection: 'row'}}>
                            <Text>Sets: </Text>
                            <TextInput placeholder = {newWorkData[number].sets} onChange = {text => setNewWorkData(prevWorkData => {let tmp = [...prevWorkData]; tmp[number].sets = text; return tmp;})} keyboardType='number-pad'></TextInput>
                        </View>
                        <View style = {{flexDirection: 'row'}}>
                            <Text>Reps: </Text>
                            <TextInput placeholder = {newWorkData[number].reps} onChange = {text => setNewWorkData(prevWorkData => {let tmp = [...prevWorkData]; tmp[number].reps = text; return tmp;})} keyboardType='number-pad'></TextInput>
                        </View>
                    </View>}>
                </FlatList>
            </View>
        </SafeAreaView>
    )

    const style = StyleSheet.create({
        
    })
}