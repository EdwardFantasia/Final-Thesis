import { View, Text } from 'react-native';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function MealInfo(props){
    const mealDataName = props.mealData.title
    const mealDataSumm = props.mealData.summary.replace(/<[^>]*>/g, "")
    return(
        <View>
            <BouncyCheckbox onPress = {() => props.addToSelected()}></BouncyCheckbox>
                <CollapsibleView title = {mealDataName}>
                    <View>
                        {<Text>{mealDataSumm}</Text>}
                    </View>
                </CollapsibleView>
        </View>
    )
}