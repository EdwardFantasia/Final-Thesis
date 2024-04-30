import { React, Component, useState, useRef} from 'react';
import { TabView, SceneMap } from 'react-native-tab-view'
import { View, Text, Linking, Button, Pressable, ScrollView, Image } from 'react-native';

export default function TabViewExample(props) {
    const meal = props.meal
    const equipmentArray = meal.equipment
    const ingredArray = meal.ingredients

    const GenInfRoute = () => (
        <View style={{alignItems: 'center'}}>
            <Pressable onPress = {() => props.setModalShow(0)} style = {{paddingBottom: 5}}>
                <Text style = {{color: '#c3c2c3', paddingBottom: .75, paddingRight: 2, padding: 1, borderStyle: "solid", borderWidth: 1, borderRadius: 10, borderColor: '#c3c2c3'}}> X</Text>
            </Pressable>
            <ScrollView style = {{height: 'auto', marginBottom: "10%"}}>
                <View style = {{alignItems: 'center'}}>
                    <Text style = {{textDecorationLine: 'underline'}}>Name</Text>
                    <Text>{meal.title}</Text>
                    <Text style = {{textDecorationLine: 'underline'}}>Summary</Text>
                    <Text>{meal.summary}</Text>
                    <Text style = {{textDecorationLine: 'underline'}}>Instructions</Text>
                    <Text>{meal.instructions}</Text>
                    <Text style = {{textDecorationLine: 'underline'}}>Ready Time</Text>
                    <Text>{meal.readyInMinutes} minutes</Text>
                    <Text style = {{textDecorationLine: 'underline'}}>Servings</Text>
                    <Text>{meal.servings}</Text>
                    <Image></Image>
                </View>
            </ScrollView>
        </View>
    )

    const EquipAndIngredRoute = () => (
        <View style={{alignItems: 'center'}}>
            <Pressable onPress = {() => props.setModalShow(0)} style = {{paddingBottom: 5}}>
                <Text style = {{color: '#c3c2c3', paddingBottom: .75, paddingRight: 2, padding: 1, borderStyle: "solid", borderWidth: 1, borderRadius: 10, borderColor: '#c3c2c3'}}> X</Text>
            </Pressable>
            <View style = {{flexDirection: 'row'}}>
                <View style = {{flexDirection: 'column'}}>
                    {equipmentArray.map(equip => {
                        return(
                            <View>
                                <Text>{equip.name}</Text>
                                <Image source = {{}}/>
                            </View>
                        )
                    })}
                </View>
                <View style = {{flexDirection: 'column'}}>
                    {ingredArray.map(ingred => {
                        return(
                            <View>
                                <Text>{ingred.name}</Text>
                                <Image source = {{}}/>
                            </View>

                        )
                    })}
                </View>
            </View>
        </View>
    )

    const NutritionRoute = () => {
        <View>
            <Image source = {{uri: meal.nutrition}}></Image>
        </View>
    }
      
      const renderScene = SceneMap({
        first: GenInfRoute,
        second: EquipAndIngredRoute,
        third: NutritionRoute
      });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'General Information' },
    { key: 'second', title: 'Ingredients & Equipment' },
    { key: 'third', title: 'Nutritional Information' }
  ]);

  return (
    <TabView
        style = {{margin: 20, marginBottom: '23%',
            backgroundColor: 'white',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,}}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
}