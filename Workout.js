import { React, Component} from 'react';
import './css/Workout.css'
import Exercise from './Exercise';

class WorkoutComp extends Component{
    constructor(props){
        super(props)
        this.route = props.route
        this.navigation = props.navigation
        this.workout = props.workout
        this.exercises = this.workout.exercises.map((curExc, excNum) => {
            return(
                <Exercise exercise = {curExc}></Exercise>
            )
        })
    }

    render(){
        return(
            <div id = "workout">
                <h3>{this.workout.name}</h3>
                <h4>{this.workout.desc}</h4>
                {this.exercises}
            </div>
        )
    }
}

export default function Workout({navigation, route, workout}){
    return(
        <WorkoutComp workout = {workout} navigation = {navigation} route = {route}></WorkoutComp>
    )
}