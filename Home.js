import { React, Component, useEffect} from 'react';
import Workout from './Workout';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function Home({navigation, route}){
    const [workouts, setWorkouts] = useState(route.params.workouts)
    useFocusEffect(() => {
        if (navigation.isFocused()){
            setWorkouts(route.params.workouts)
        }
        }, [navigation.isFocused()])

    return(
        <div>
            {workouts.map((currentWorkout) => {
                    return(<Workout workout = {currentWorkout}></Workout>)
                })}
            <button onClick={() => navigation.navigate('WorkoutGen', {workoutData: workouts})}>Create Workout</button>
        </div>
    )

    const style = StyleSheet.create({
        
    })
}