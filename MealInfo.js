export default function MealInfo(props){
    const mealName = props.title
    const mealInstructions = props.mealInstructions
    const hideCheck = props.hideCheck
    return(
        <View style = {{position: 'absolute', flexDirection: "row", bottom: -225}}>
            <Text>{mealName}</Text>
            <Text>{mealInstructions}</Text>
        </View>
    )
}