import { React, Component} from 'react';

class ExerciseComp extends Component{
    constructor(props){
        super(props)
        this.exercise = props.exercise
    }

    render(){
        return(
            <div>
                <h5>{this.exercise.excName}</h5>
                <p>{this.exercise.excDesc}</p>
            </div>
        )
    }
}

export default function Exercise({exercise, navigation, route}){
    return(
        <ExerciseComp exercise = {exercise} navigation = {navigation} route = {route}></ExerciseComp>
    )
}