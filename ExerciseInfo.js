import { Component } from "react";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import {View} from 'react-native'

class ExerciseInfo extends Component{
    constructor(props){
        super(props)
        this.exerciseData = props.exerciseData
        this.addToSelected = props.addToSelected
    }

    render(){
        return(
            <div>
                <CollapsibleView title = {<div><p>{this.exerciseData.name}</p> <input onClick = {() => this.addToSelected()} type = 'checkbox'></input></div>}>
                    <View>
                        <p>{this.exerciseData.instructions}</p>
                    </View>
                </CollapsibleView>
            </div>
        )
    }
}

export default ExerciseInfo