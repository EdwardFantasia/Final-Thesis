import { React, Component} from 'react';
import ExerciseInfo from './ExerciseInfo';
import {View, Text} from 'react-native'
import CollapsibleView from "@eliav2/react-native-collapsible-view";

export default function Workout(props){
    const exercises = props.workout.exercises
    const modalDisplay = props.modalDisplay
    return(
        <CollapsibleView title = {<Text style = {{fontWeight: 'bold', fontSize: 20, textAlign: 'center', width: '70%'}}>{props.workout.workoutName}</Text>}>
            <Text style = {{textAlign: 'center'}}>{props.workout.workoutDesc}</Text>
            {exercises.map(exercise => {
                return(
                    <ExerciseInfo modalDisplay = {() => modalDisplay(exercise.exerciseItem._id)} hideCheck = {true} hideSAR = {true} prof = {true} exerciseData = {{_id: exercise.exerciseItem._id, name: exercise.exerciseItem.name, instructions: exercise.exerciseItem.instructions, sets: exercise.sets, reps: exercise.reps}} />
                )
            })}
        </CollapsibleView>
    )
}