import { View, Text } from 'react-native';
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function MealInfo(props){
    const mealData = props.mealData
    return(
        <View style = {{}}>
            <Text>{mealData.title}</Text>
            <Text>{mealData.summary}</Text>
        </View>
    )
}