import { React, Component, useState, useRef} from 'react';
//import './css/WorkoutGen.css'
import ExerciseInfo from './ExerciseInfo';
import { Button, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {SelectList, MultipleSelectList} from 'react-native-dropdown-select-list'

/*API: https://rapidapi.com/brianliong1999-aAas5mGoYZv/api/advanced-exercise-finder */

//TODO: need to add in some randomization element (just add in a radio button that would allow for randomization, ask for level of randomization (low, med, high), then save that into account exercise data)
//TODO: Add X to top of Modal (change Modal return to just return a state variable and just change state variable with X at top to close)
//TODO: need to reset modal after request

export default function WorkoutModalComponent(props){
    const addFunc = props.addFunc
    const addToWorkData = props.addToWorkData
    const setShow = props.setShow
    const [screenState, setScreen] = useState(0)
    const [errorHidden, setErrorH] = useState(true)
    const [selectedExcs, setSelectedExcs] = useState([])
    const [selectedPMG, setSPMG] = useState([])
    const [selectedSMG, setSSMG] = useState([])
    const [selectedPM, setSPM] = useState([])
    const [selectedSM, setSSM] = useState([])
    const [tags, setST] = useState([])
    const [rand, setRand] = useState(false)
    let query = useRef({
        equipment: "",
        force: "",
        movement: "",
        search: "",
        type: ""
    })

    const excsByGroup = {
        back: ["Trapezius", "Erector Spinae", "Latissimus Dorsi"],
        chest: ["Upper Chest", "Lower Chest", "Pectoralis Minor"],
        shoulders: ["Anterior Deltoid", "Lateral Deltoid", "Posterior Deltoid"],
        arms: ["Triceps", "Biceps", "Pronators", "Supinators", "Forearm Flexors", "Forearm Extensors", "Brachioradialis"],
        legs: ["Quadriceps", "Hamstrings", "Calves", "Adductors", "Abductors", "Gluteal Muscles"],
        core: ["Obliques", "Transverse Abdominis", "Rectus Absominis"]
    }

    let pmChecks = useRef([])
    let smChecks = useRef([])
    let queryResults = useRef([])

    const queryCreation = queryParam => {
        if((typeof query.current[queryParam] == "string" && query.current[queryParam] != "") || (query.current[queryParam].length != 0)){ //if this field of query is either a non-empty string or a non-empty array...
            if(typeof query.current[queryParam] == "string"){ //if a string...
                return queryParam + ": \"" + query.current[queryParam].toLowerCase() + "\", " //add the query param formatted to be accepted by API
            }
            else{
                let temp = ""
                for(let i = 0; i < query.current[queryParam].length; i++){ //for each item in query param array...
                    temp += '"' + query.current[queryParam][i].toLowerCase() + '", ' //
                }
                return queryParam + ": [" + temp + "]"
            }
        }
        else{
            return ""
        }   
    }

    const getExercises = async() => {
        let queryString = ""
        console.log(selectedPMG)
        query.current.primaryMuscleGroups = selectedPMG
        query.current.secondaryMuscleGroups = selectedSMG
        query.current.primaryMuscles = selectedPM
        query.current.secondaryMuscles = selectedSM
        query.current.tags = tags
        console.log(query.current)
        for(let i = 0; i < Object.keys(query.current).length; i++){
            queryString += queryCreation(Object.keys(query.current)[i])
        }

        const queryReq = `
            query {
                exercises(
                    exerciseQuery: {` + queryString + `}
                    ) {
                    id
                    name
                    force
                    equipment
                    instructions
                    primaryMuscleGroups
                    primaryMuscles
                    secondaryMuscleGroups
                    secondaryMuscles
                    tags
                    type
                }
            }
        `

        console.log(JSON.stringify({query:queryReq}))

        const url = 'https://advanced-exercise-finder.p.rapidapi.com/'
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '883b2eb2cfmsh653f0ac8e3065dap1ed5f8jsn2d6a69191c55',
		        'x-rapidapi-host': 'advanced-exercise-finder.p.rapidapi.com',
		        'Content-Type': 'application/json'
            },
            body: JSON.stringify({query:queryReq})
        }

        try {
	        let response = await fetch(url, options);
	        queryResults.current = JSON.parse(await response.text())['data']['exercises']

            console.log(queryResults)
            setScreen(4)
        } catch (error) {
	        console.error(error);
        }
    }

    const screenEst = async(screenNum) => {
        /**
         * Establishes modal screen information for screenNum screen
         * @param {Number} screenNum: number to set modal screen to
         */
        switch(screenNum){
            case 3:
                {/*Map this and get every exc related to muscGroup*/}
                selectedPMG.map((muscGroup) => {
                    pmChecks.current = pmChecks.current.concat(excsByGroup[muscGroup.toLowerCase()])
                })
                selectedSMG.map((sMuscGroup) => {
                    smChecks.current = smChecks.current.concat(excsByGroup[sMuscGroup.toLowerCase()])
                })
        }
        setScreen(screenNum)
    }

        {/*API QUERY PARAMS (* = required from APP):
        Name: string
        Equipment: string,
        Force: string,
        Movement: string,
        *PMG: array (should be array filled with muscle groups from ),
        SMG: array/string (should be any muscle group avail, also probably only one),
        PM: array (should dynamically change based on muscle groups selected),
        SM: array (should be array of all muscle groups),
        Tags: array,
        Type: string
        */}

        if(screenState == 0){
            return(
            <SafeAreaView style = {{
                //source: https://reactnative.dev/docs/modal
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <Button title = "Create Workout" onPress={() => setScreen(1)} />
                <Button title = "Import Workout" onPress={() => setScreen(2)} />
            </SafeAreaView>
        )
        }else if(screenState == 1){
            {/*Return create workout modal page*/}
            return(
            <SafeAreaView style = {{
                //source: https://reactnative.dev/docs/modal
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <Text>Exercise Name</Text>
                <TextInput id = 'excName'></TextInput>
                <Text>Exercise Description</Text>
                <TextInput id = 'excDesc'></TextInput>
                <Text>Sets: </Text>
                <TextInput id = 'sets'></TextInput>
                <Text>Reps: </Text>
                <TextInput id = 'reps'></TextInput>
                <Button title = "Save Exercise" />
            </SafeAreaView>
        )
        }
        else if (screenState == 2){
            {/*First page of import workout sequence*/}
            return(
                <SafeAreaView style = {{
                    //source: https://reactnative.dev/docs/modal
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                    <Text>Any keywords you wish to search for?</Text>
                    <TextInput></TextInput>

                    <Text>What equipment do you want to use?</Text>
                    <SelectList
                        data = {["Doesn't Matter", "None", "Barbell", "Dumbells", "Machine", "Cable", "Kettlebell", "Resistance Band", "Resistance Band Assisted", "EZ Curl Barbell", "Trap Bar", "Smith Machine", "Body Weight", "Weighted", "Misc"]}
                        setSelected = {val => query.current.equipment = (val == "Doesn't Matter" ? "" : val)}
                        id = "equip"
                    ></SelectList>

                    <Text>What primary muscle groups do you wish to exercise?</Text>
                    <MultipleSelectList data = {["Back","Chest","Shoulders","Arms","Legs","Core"]}
                                        setSelected={val => setSPMG(val)}
                                        id = "pmg"
                    ></MultipleSelectList>

                    <Text>{"\n"}</Text>

                    <Text>What secondary muscle groups do you wish to exercise?</Text>
                    <View>
                    <MultipleSelectList data = {["Back","Chest","Shoulders","Arms","Legs","Core"]}
                                        setSelected = {val => setSSMG(val)}
                                        id = "smg"
                    ></MultipleSelectList>
                    </View>

                    <Text>What force do you wish to use for this exercise?</Text>
                    <SelectList
                        data = {["Doesn't Matter", "Push", "Pull", "Push and Pull"]}
                        setSelected = {val => query.current.force = (val == "Doesn't Matter" ? "" : val)}
                        id = "force"
                    ></SelectList>
                    
                    <Button title = "Next Page" onPress = {() => screenEst(3)} />
                </SafeAreaView>
            )
        }
        else if (screenState == 3){
            return(
                <SafeAreaView style = {{
                    //source: https://reactnative.dev/docs/modal
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                    <Text>Please pick the primary muscles you wish these exercises to work.</Text>
                    <MultipleSelectList data = {[{value: "Trapezius", disabled: !pmChecks.current.includes("Trapezius")}, {value: "Erector Spinae", disabled: !pmChecks.current.includes("Erector Spinae")}, {value: "Latissimus Dorsi", disabled: !pmChecks.current.includes("Latissimus Dorsi")},
                                                {value: "Upper Chest", disabled: !pmChecks.current.includes("Upper Chest")}, {value: "Lower Chest", disabled: !pmChecks.current.includes("Lower Chest")}, {value: "Pectoralis Minor", disabled: !pmChecks.current.includes("Pectoralis Minor")},
                                                {value: "Anterior Deltoid", disabled: !pmChecks.current.includes("Anterior Deltoid")}, {value: "Lateral Deltoid", disabled: !pmChecks.current.includes("Lateral Deltoid")}, {value: "Posterior Deltoid", disabled: !pmChecks.current.includes("Posterior Deltoid")},
                                                {value: "Triceps", disabled: !pmChecks.current.includes("Triceps")}, {value: "Biceps", disabled: !pmChecks.current.includes("Biceps")}, {value: "Pronators", disabled: !pmChecks.current.includes("Pronators")}, {value: "Supinators", disabled: !pmChecks.current.includes("Supinators")}, {value: "Forearm Flexors", disabled: !pmChecks.current.includes("Forearm Flexors")}, {value: "Forearm Extensors", disabled: !pmChecks.current.includes("Forearm Extensors")}, {value: "Brachioradialis", disabled: !pmChecks.current.includes("Brachioradialis")},
                                                {value: "Quadriceps", disabled: !pmChecks.current.includes("Quadriceps")}, {value: "Hamstrings", disabled: !pmChecks.current.includes("Hamstrings")}, {value: "Calves", disabled: !pmChecks.current.includes("Calves")}, {value: "Adductors", disabled: !pmChecks.current.includes("Adductors")}, {value: "Abductors", disabled: !pmChecks.current.includes("Abductors")}, {value: "Gluteal Muscles", disabled: !pmChecks.current.includes("Gluteal Muscles")},
                                                {value: "Obliques", disabled: !pmChecks.current.includes("Obliques")}, {value: "Transverse Abdominis", disabled: !pmChecks.current.includes("Transverse Abdominis")}, {value: "Transverse Abdominis", disabled: !pmChecks.current.includes("Transverse Abdominis")}
                                                ]}
                                        setSelected = {val => setSPM(val)}
                                        save = "value"
                                        id = "pm"
                    ></MultipleSelectList>
                    
                    <Text>Please pick the secondary muscles you wish these exercises to work.</Text>
                    <MultipleSelectList data = {[{value: "Trapezius", disabled: !smChecks.current.includes("Trapezius")}, {value: "Erector Spinae", disabled: !smChecks.current.includes("Erector Spinae")}, {value: "Latissimus Dorsi", disabled: !smChecks.current.includes("Latissimus Dorsi")},
                                                {value: "Upper Chest", disabled: !smChecks.current.includes("Upper Chest")}, {value: "Lower Chest", disabled: !smChecks.current.includes("Lower Chest")}, {value: "Pectoralis Minor", disabled: !smChecks.current.includes("Pectoralis Minor")},
                                                {value: "Anterior Deltoid", disabled: !smChecks.current.includes("Anterior Deltoid")}, {value: "Lateral Deltoid", disabled: !smChecks.current.includes("Lateral Deltoid")}, {value: "Posterior Deltoid", disabled: !smChecks.current.includes("Posterior Deltoid")},
                                                {value: "Triceps", disabled: !smChecks.current.includes("Triceps")}, {value: "Biceps", disabled: !smChecks.current.includes("Biceps")}, {value: "Pronators", disabled: !smChecks.current.includes("Pronators")}, {value: "Supinators", disabled: !smChecks.current.includes("Supinators")}, {value: "Forearm Flexors", disabled: !smChecks.current.includes("Forearm Flexors")}, {value: "Forearm Extensors", disabled: !smChecks.current.includes("Forearm Extensors")}, {value: "Brachioradialis", disabled: !smChecks.current.includes("Brachioradialis")},
                                                {value: "Quadriceps", disabled: !smChecks.current.includes("Quadriceps")}, {value: "Hamstrings", disabled: !smChecks.current.includes("Hamstrings")}, {value: "Calves", disabled: !smChecks.current.includes("Calves")}, {value: "Adductors", disabled: !smChecks.current.includes("Adductors")}, {value: "Abductors", disabled: !smChecks.current.includes("Abductors")}, {value: "Gluteal Muscles", disabled: !smChecks.current.includes("Gluteal Muscles")},
                                                {value: "Obliques", disabled: !smChecks.current.includes("Obliques")}, {value: "Transverse Abdominis", disabled: !smChecks.current.includes("Transverse Abdominis")}, {value: "Transverse Abdominis", disabled: !smChecks.current.includes("Transverse Abdominis")}
                                                ]}
                                        setSelected = {val => setSSM(val)}
                                        save = "value"
                                        id = "sm"
                    ></MultipleSelectList>

                    <Text>{"\n"}</Text>
                    
                    <Text>Please select any tags you wish the exercises to follow:</Text>
                    <MultipleSelectList data = {["Powerlifting", "Olympic", "Strongman", "Calisthenics", "Plyometric"]}
                                        setSelected={val => {setST(val)}}
                                        id = "tag"
                    ></MultipleSelectList>

                    <Text>{"\n"}</Text>
                    <Text>Please select the type of exercise you want to search for:</Text>

                    <SelectList data = {["Doesn't Matter", "Compound", "Isolation"]}
                                setSelected = {val => query.current.type = (val == "Doesn't Matter" ? "" : val)}
                                id = 'type'
                    ></SelectList>

                    <RadioButton ></RadioButton>

                    <Button title = "Search for Exercises" onPress={() => getExercises()} />
                </SafeAreaView>
            )
        }
        else if (screenState == 4){ {/*Results Page*/}
            return(
                <SafeAreaView style = {{
                    //source: https://reactnative.dev/docs/modal
                    height: 500,
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                    <FlatList data = {queryResults.current} renderItem={({item: query}) => <ExerciseInfo hideCheck = {false} addToSelected = {() => setSelectedExcs(addFunc(selectedExcs, query))} exerciseData = {query}/>}>
                    </FlatList>
                    <Button title = {rand == true ? 'Add Selected Exercises to Random Exercise' : "Add Selected Exercise(s) to Workout"} onPress = {() => {addToWorkData(selectedExcs); setShow(false)}} />
                </SafeAreaView>
            )
        }
    }