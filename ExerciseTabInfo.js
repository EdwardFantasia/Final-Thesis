import { React, Component, useState, useRef} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view'
import { View, Text} from 'react-native';

export default function ExerciseTabInfo(props){
    //setup: https://reactnavigation.org/docs/tab-view/
    const exercise = props.exercise
    const [index, setIndex] = useState(0)
    const GenInfo = () => (
        <View style = {{
            //source: https://reactnative.dev/docs/modal
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <View>
                <Text>Name</Text>
                <Text>{'\u2022'} + {exercise.exerciseItem.name}</Text>

                <Text>Instructions</Text>
                <Text>{'\u2022'} + {exercise.exerciseItem.instructions}</Text>

                <Text>Equipment</Text>
                <Text>{'\u2022'} + {exercise.exerciseItem.equipment}</Text>

                <Text>Force</Text>
                <Text>{'\u2022'} + {exercise.exerciseItem.force}</Text>
                
                <Text>Type</Text>
                <Text>{'\u2022'} + {exercise.exerciseItem.type}</Text>
            </View>
            <Text>YouTube Demonstrations</Text>
        </View>
    )
    const renderScene = SceneMap({
        first: GenInfo()
    })

    const [routes] = useState([
        {key: 'first', title: 'Exercise Information'}
    ])
    return(
        <TabView navigationState={{index, routes}} renderScene={renderScene} onIndexChange={setIndex}/>
    )
}