import Landing from './Landing'
import Signup from './Signup';
import Home from './Home'
import MealGenerat from './MealGenerat'
import Search from './Search'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutGenerat from './WorkoutGenerat';

import { StyleSheet } from 'react-native';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Landing'> 
        <Stack.Screen name='Landing' component={Landing}/>
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MealGen' component={MealGenerat} />
        <Stack.Screen name='WorkoutGen' component = {WorkoutGenerat} />
        {/*<Stack.Screen name='Search' component = {Search} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({

})