import { React, Component} from 'react';
//import './css/Landing.css'
import { Dimensions, Modal, StyleSheet, Text, SafeAreaView, View, Image, TextInput, Button, Switch } from 'react-native';
import WorkoutModalComp from './WorkoutModalComp';

class LandingComp extends Component{
    constructor(props){
        super(props)
        this.navigation = props.navigation
        this.state = {
            error: "hidden",
            modalVis: false
        };
        this.inputBody = {
            login1: "", 
            password: ""
        }
        this.test = ""
        /* TODO: NEED TO COMPLETE STYLING SWITCH */
    }

    signUpOnClick(){
        this.navigation.navigate("Signup", {email: this.inputBody.login1}) //source: https://www.youtube.com/watch?v=-40TBdSRk6E
    }
    
    loginOnClick(){
        //check if this email and pass are correct (could combine signUp and login onclicks when refactoring)
            this.navigation.navigate('WorkoutHome', {workouts:
                    [ //test data, will be replaced with database data in the future
                        {
                            workoutName: 'Chest Day',
                            workoutDesc: 'This chest day focuses primarily on chest, with a bit of tricep work',
                            exercises: [
                                {
                                    equipment: 'dumbells',
                                    force: 'push',
                                    id: '0a01',
                                    instructions: 'Perform the dumbbell bench press exercise by lying flat on your back on a bench and push dumbbells up and retract',
                                    name: 'DB Bench',
                                    primaryMuscleGroups: ['chest'],
                                    primaryMuscles: ['upper chest'],
                                    secondaryMuscleGroups: ['shoulders'],
                                    secondaryMuscles: ['shoulder muscles'],
                                    tags: ['powerlifting'],
                                    type: 'compound'
                                },
                                {
                                    equipment: 'idk',
                                    force: 'pull',
                                    id: '0a02',
                                    instructions: 'Perform the barbell squat exercise by putting barbell on back and performing a sitting motion then standing when legs are around 90 degree angle',
                                    name: 'Barbell Squat',
                                    primaryMuscleGroups: ['legs'],
                                    primaryMuscles: ['quadriceps'],
                                    secondaryMuscleGroups: ['shoulders'],
                                    secondaryMuscles: ['shoulder muscles'],
                                    tags: ['powerlifting'],
                                    type: 'compound'
                                }
                            ]
                        }
                    ]})

    }

    async login(){
        console.log(this.inputBody)
    
        let response = await fetch('http://10.0.2.2:3443/users/signIn', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(this.inputBody)
        }).then(function(resp){
            return resp.json()
        }).catch(err => {
            console.log(err)
            return
        })
        console.log(response)

        this.navigation.navigate('Home', {userData: response})
    }

    render(){
        return(
            <SafeAreaView>
                <Image style = {{width: 200, height: 200}} id = 'logo' source = {require('./assets/ex365.png')}></Image>
                <View>
                    <Text>Email/Username: </Text>
                    <TextInput id = "email" onChangeText={text => this.inputBody.login1 = text}></TextInput>
                </View>
                <View id = 'passInfo'>
                    <Text>Password: </Text>
                    <TextInput onChangeText={text => this.inputBody.password = text} id = "pass"></TextInput>
                </View>
                <Button title = "Sign Up" onPress={() => this.signUpOnClick()} />
                <Text>{"\n"}</Text>
                <Button title = "Login" onPress={() => this.login()} />
                <Button title = "To Next Page (FOR EZ TEST)" onPress = {() => this.loginOnClick()}></Button>
                <Button title = "Dimensions Test" onPress = {() => console.log(Dimensions.get('screen'))} />
                <Text>Error: Please enter a valid account</Text>
                <Modal transparent = {true} visible = {this.state.modalVis}>
                    <WorkoutModalComp></WorkoutModalComp>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default function Landing({navigation}){
    return(
        <LandingComp navigation = {navigation}></LandingComp>
    )
}