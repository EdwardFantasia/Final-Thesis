import Landing from './Landing'
import Signup from './Signup';
import WorkoutHome from './WorkoutHome'
import Home from './Home'
//import './css/App.css'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutGenerat from './WorkoutGenerat';

//import "@fontsource/dm-sans";
import { StyleSheet } from 'react-native';

export default function App() {
  const Stack = createNativeStackNavigator();
  const NavBar = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Landing'> 
        <Stack.Screen name='Landing' component={Landing}/>
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='WorkoutHome' component={WorkoutHome} />
        <Stack.Screen name='WorkoutGen' component = {WorkoutGenerat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({

})