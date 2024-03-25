import { React, Component} from 'react';
import './css/WorkoutGen.css'
import { Modal, Button } from 'react-bootstrap'; //change these to react native versions
import ExerciseInfo from './ExerciseInfo';
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';

/*API: https://rapidapi.com/brianliong1999-aAas5mGoYZv/api/advanced-exercise-finder */

//TODO: need to add in some randomization element (just add in a radio button that would allow for randomiztion, save that into account exercise data)
//TODO: add delete exercise functionality on WorkoutGeneratComp
//TODO: collabsible needs to be highlightable as well to show which one is going to be added to workout
//TODO: see what changing all selects to dropdowns will do
//TODO: create tag creation system where there is a dictionary of all exercises 
//TODO: Add X to top of Modal (change Modal return to just return a state variable and just change state variable with X at top to close)

class WorkoutModalComp extends Component{
    constructor(props){
        super(props)
        this.state = {
            screenState: 0,
            errorHidden: true,
            selectedExcs: [], 
            query: {
                equipment: "",
                force: "",
                movement: "",
                primaryMuscleGroups: [],
                primaryMuscles: [],
                search: "",
                secondaryMuscleGroups: [],
                secondaryMuscles: [],
                tags: [],
                type: ""
            }
        }
        this.addFunc = props.addFunc
        this.addToWorkData = props.addToWorkData
        this.excsByGroup = {
            back: ["Trapezius", "Erector Spinae", "Latissimus Dorsi"],
            chest: ["Upper Chest", "Lower Chest", "Pectoralis Minor"],
            shoulders: ["Anterior Deltoid", "Lateral Deltoid", "Posterior Deltoid"],
            arms: ["Triceps", "Biceps", "Pronators", "Supinators", "Forearm Flexors", "Forearm Extensors", "Brachioradialis"],
            legs: ["Quadriceps", "Hamstrings", "Calves", "Adductors", "Abductors", "Gluteal Muscles"],
            core: ["Obliques", "Transverse Abdominis", "Rectus Absominis"]
        }
        this.pmChecks = []
        this.smChecks = []

        this.secondaryDisplay

        this.queryResults = []
    }

    queryCreation(queryParam){
        if((typeof this.state.query[queryParam] == "string" && this.state.query[queryParam] != "") || (this.state.query[queryParam].length != 0)){
            if(typeof this.state.query[queryParam] == "string"){
                return queryParam + ": \"" + this.state.query[queryParam] + "\", "
            }
            else{
                let temp = ""
                for(let i = 0; i < this.state.query[queryParam].length; i++){
                    temp += '"' + this.state.query[queryParam][i] + '", '
                }
                return queryParam + ": [" + temp + "]"
            }
        }
        else{
            return ""
        }   
    }

    async getExercises(){
        let queryString = ""
        for(let i = 0; i < Object.keys(this.state.query).length; i++){
            queryString += this.queryCreation(Object.keys(this.state.query)[i])
        }

        const query = `
            query {
                exercises(
                    exerciseQuery: {` + queryString + `}
                    ) {
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

        console.log(JSON.stringify({query:query}))

        const url = 'https://advanced-exercise-finder.p.rapidapi.com/'
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '883b2eb2cfmsh653f0ac8e3065dap1ed5f8jsn2d6a69191c55',
		        'x-rapidapi-host': 'advanced-exercise-finder.p.rapidapi.com',
		        'Content-Type': 'application/json'
            },
            body: JSON.stringify({query:query})
        }

        try {
	        let response = await fetch(url, options);
	        this.queryResults = JSON.parse(await response.text())['data']['exercises']

            console.log(this.queryResults)
            this.setState({screenState: 4})
        } catch (error) {
	        console.error(error);
        }
    }

    async screenEst(screenNum){
        switch(screenNum){
            case 3:
                {/*Map this and get every exc related to muscGroup*/}
                this.state.query['primaryMuscleGroups'].map((muscGroup) => {
                    this.pmChecks = this.pmChecks.concat(this.excsByGroup[muscGroup])
                })
                this.state.query['secondaryMuscleGroups'].map((sMuscGroup) => {
                    this.smChecks = this.smChecks.concat(this.excsByGroup[sMuscGroup])
                })
        }
        this.setState({screenState: screenNum})
    }

    queryStringChange(objParam, radVal, radNum){ //TODO: look for unnecessary .toLowerCase functions
        if(objParam != 'equipment'){
            if(this.state.query[objParam].toLowerCase() == radVal.toLowerCase()){
                document.getElementsByName(objParam)[radNum].checked = false
                this.state.query[objParam] = ""
            }
            else{
                this.state.query[objParam] = radVal.toLowerCase()
            }
        }
        else{
            this.state.query['equipment'] = radVal.toLowerCase()
        }
    }
        
    render(){
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

        if(this.state.screenState == 0){
            return(
            <div>
                <Button onClick={() => this.setState({screenState: 1})}>Create Workout</Button>
                <Button onClick={() => this.setState({screenState: 2})}>Import Workout</Button>
            </div>
        )
        }else if(this.state.screenState == 1){
            {/*Return create workout modal page*/}
            return(
            <div>
                <label for = 'excName'>Exercise Name</label>
                <input type = 'text' id = 'excName' name = 'excName'></input>
                <label for = 'excDesc'>Exercise Description</label>
                <input type = 'text' id = 'excDesc' name = 'excDesc'></input>
                <label for = 'sets'>Sets: </label>
                <input type = 'number' id = 'sets' name = 'sets'></input>
                <label for = 'sets'>Reps: </label>
                <input type = 'number' id = 'reps' name = 'reps'></input>
                <Button>Save Exercise</Button>
            </div>
        )
        }
        else if (this.state.screenState == 2){
            {/*First page of import workout sequence*/}
            return(
                <div>
                    <p>Any keywords you wish to search for?</p>
                    <input></input>

                    <p>Choose what equipment you wish to use for this exercise</p>
                    <select onClick={() => this.queryStringChange('equipment', document.getElementById('equip').value, null)} name = 'equip' id = 'equip'>
                    {["None", "Barbell", "Dumbells", "Machine", "Cable", "Kettlebell", "Resistance Band", "Resistance Band Assisted", "EZ Curl Barbell", "Trap Bar", "Smith Machine", "Body Weight", "Weighted", "Misc"].map((equip) => {
                        return(
                            <option value = {equip}>{equip}</option>
                        )
                    })}
                    </select>

                    <label>Please select the primary muscle groups you wish these exercises to work.
                        {["Back","Chest","Shoulders","Arms","Legs","Core"].map((muscGr) => {
                            return(
                                <label><input type='checkbox' id = {muscGr} name = {muscGr} value = {muscGr} onClick={() => this.addFunc(this.state.query['primaryMuscleGroups'], muscGr.toLowerCase())}></input>{muscGr}</label>
                            )
                        })}
                    </label>

                    <br></br>

                    <label>Please select the secondary muscle groups you wish these exercises to work.
                        {["Back","Chest","Shoulders","Arms","Legs","Core"].map((sMuscGr) => {
                            return(
                                <label><input type='checkbox' id = {sMuscGr} name = {sMuscGr} value = {sMuscGr} onClick={() => this.addFunc(this.state.query['secondaryMuscleGroups'], sMuscGr.toLowerCase())}></input>{sMuscGr}</label>
                            )
                        })}
                    </label>

                    <p>Choose what type of force you wish to use for this exercise.</p>
                    {["Push", "Pull", "Push and Pull"].map((force, num) => {
                        return(
                            <div>
                                <input onClick = {() => this.queryStringChange('force', force, num)} type = 'radio' value = {force} id = {force} name = 'force'></input>
                                <label htmlFor = {force}>{force}</label>
                            </div>
                        )
                    })}
                    
                    <Button onClick = {() => {this.screenEst(3); this.secondaryDisplay = (this.state.query['secondaryMuscleGroups'].length == 0)}}>Next Page</Button>
                </div>
            )
        }
        else if (this.state.screenState == 3){
            return(
                <div>
                    <p>Please pick the primary muscles you wish these exercises to work.</p>
                    {this.pmChecks.map((primMusc) => {
                        return(
                            <label><input onClick={() => this.addFunc(this.state.query['primaryMuscles'], primMusc.toLowerCase())} type='checkbox' id = {primMusc} name = 'primMusc' value = {primMusc}></input>{primMusc}</label>
                        )
                    })}

                    <div hidden = {this.secondaryDisplay}>
                        <p>Please pick the secondary muscles you wish these exercises to work.</p>
                        {this.smChecks.map((secMusc) => {
                            return(
                                <label><input onClick={() => this.addFunc(this.state.query['secondaryMuscles'], secMusc.toLowerCase())} type='checkbox' id = {secMusc} name = 'secMusc' value = {secMusc}></input>{secMusc}</label>
                            )
                        })}
                    </div>

                    <br></br>

                    <label>
                        Please select any tags you wish the exercises to follow:
                        <br></br>
                        {["Powerlifting", "Olympic", "Strongman", "Calisthenics", "Plyometric"].map((tag) => {
                            return(
                                <label><input type = 'checkbox' onClick={() => this.addFunc(this.state.query['tags'], tag.toLowerCase())}></input>{tag}</label>
                            )
                        })}
                    </label>

                    <br></br>
                    <label>
                        Please select the type of exercise you want to search for:
                        <br></br>
                        <label><input type = 'radio' name = 'type' onClick={() => this.queryStringChange('type', "compound", 0)} value = 'compound' id = 'compound'></input>Compound</label>                    
                        <label><input type = 'radio' name = 'type' onClick={() => this.queryStringChange('type', "isolation", 1)} value = 'isolation' id = 'isolation'></input>Isolation</label>
                    </label>
                    <Button onClick={() => this.getExercises()}>Search for Exercises</Button>
                </div>
            )
        }
        else if (this.state.screenState == 4){ {/*Results Page*/}
            return(
                <SafeAreaView style = {{flex: 1, height: screen.height}}>
                    <FlatList data = {this.queryResults} renderItem={({item: query}) => <ExerciseInfo addToSelected = {() => this.addFunc(this.state.selectedExcs, query)} exerciseData = {query}/>}>
                    </FlatList>
                    <Button onClick = {() => this.addToWorkData(this.state.selectedExcs)}>Add Selected Exercise(s) to Workout</Button>
                </SafeAreaView>
            )
        }
    }
}

export default WorkoutModalComp