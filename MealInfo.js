import { View, Text } from 'react-native';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function MealInfo(props){
    const mealDataName = props.mealData.title
    const mealDataSumm = props.mealData.summary.replace(/<[^>]*>/g, "")
    return(
        <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <BouncyCheckbox fillColor="#2196F3" onPress = {() => props.addToSelected()}></BouncyCheckbox>
                <CollapsibleView style = {{width: '75%'}} title = {<Text>{mealDataName}</Text>}>
                    <View>
                        <Text style = {{textAlign: "center"}}>{mealDataSumm}</Text>
                    </View>
                </CollapsibleView>
        </View>
    )
}