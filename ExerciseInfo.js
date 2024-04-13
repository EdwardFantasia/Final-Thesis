import { Component } from "react";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import {View, Text, TextInput} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

class ExerciseInfo extends Component{
    constructor(props){
        super(props)
        this.exerciseData = props.exerciseData
        this.addToSelected = props.addToSelected
        this.hideCheck = props.hideCheck
    }

    render(){
        return(
            <View>
                <BouncyCheckbox hidden = {this.hideCheck} onPress = {() => this.addToSelected()}></BouncyCheckbox>
                <CollapsibleView title = {<Text>{this.exerciseData.name}</Text>}>
                    <View>
                        <Text>{this.exerciseData.instructions}</Text>
                    </View>
                </CollapsibleView>
            </View>
        )
    }
}

export default ExerciseInfo