import { Component } from "react";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import {View} from 'react-native'

class ExerciseInfo extends Component{
    constructor(props){
        super(props)
        this.exerciseData = props.exerciseData
        this.addToSelected = props.addToSelected
        this.hideCheck = props.hideCheck
    }

    render(){
        return(
            <div>
                <input hidden = {this.hideCheck} onClick = {() => this.addToSelected()} type = 'checkbox'></input>
                <CollapsibleView title = {<p>{this.exerciseData.name}</p>}>
                    <View>
                        <p>{this.exerciseData.instructions}</p>
                    </View>
                </CollapsibleView>
            </div>
        )
    }
}

export default ExerciseInfo