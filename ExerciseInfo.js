import { Component } from "react";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import {View, Text, TextInput, Pressable} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

class ExerciseInfo extends Component{
    constructor(props){
        super(props)
        this.exerciseData = props.exerciseData
        this.addToSelected = props.addToSelected
        this.hideCheck = props.hideCheck
        this.hideSAR = props.hideSAR
    }

    render(){
        return(
            <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                {!this.hideCheck && 
                    <BouncyCheckbox fillColor="#2196F3" onPress = {() => this.addToSelected()}></BouncyCheckbox>
                }
                <CollapsibleView style = {{width: '60%'}} title = {<Text>{this.exerciseData.name}</Text>}>
                    <View>
                        <Text style = {{textAlign: "center"}}>{this.exerciseData.instructions}</Text>
                    </View>
                </CollapsibleView>
                {!this.hideSAR && 
                    <View style = {{flexDirection: 'row', marginBottom: 5}}>
                        <View style = {{flexDirection: 'column', marginRight: 7.5}}>
                            <Text>Sets</Text>
                            <TextInput maxLength = {3} style = {{borderStyle: "solid", borderWidth: 1, borderRadius: 5, textAlign: 'center'}} keyboardType="numeric"></TextInput>
                        </View>
                        <View style = {{flexDirection: 'column'}}>
                            <Text>Reps</Text>
                            <TextInput maxLength = {3} style = {{borderStyle: "solid", borderWidth: 1, borderRadius: 5, textAlign: 'center'}} keyboardType="numeric"></TextInput>
                        </View>
                    </View>
                }   
            </View>
        )
    }
}

export default ExerciseInfo