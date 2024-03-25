import { React, Component} from 'react';
import './css/Landing.css'
import { StyleSheet } from 'react-native';
import logo from './assets/ex365.png'

class LandingComp extends Component{
    constructor(props){
        super(props)
        this.navigation = props.navigation
        this.state = {
            error: "hidden"
        };

        /** TODO: NEED TO COMPLETE STYLING SWITCH
        const style = StyleSheet.create({
            logo: {
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                transform: scale(.3),
                outline: '1px solid black'
            },
            
            input: {
                margin: 'auto',
                width: 50,
                padding: 10,
                display: block
            },
            
            passInfo: {
                marginTop: 100
            },
            
            button: {
                backgroundColor: '#219ebc',
                border: 'none',
                borderRadius: 2,
                color: 'white',
                padding: 30,
                textAlign: 'center',
                textDecoration: 'none',
                display: 'block',
                fontSize: 16,
                marginTop: 100
            }
        })
        */
    }

    signUpOnClick(email){
        this.navigation.navigate("Signup", {email: email}) //source: https://www.youtube.com/watch?v=-40TBdSRk6E
    }
    
    loginOnClick(email, pw){
        //check if this email and pass are correct (could combine signUp and login onclicks when refactoring)
            if(email == 'ed@gmail.com' && pw == '123'){
                if(this.state.error == "visible"){
                    this.setState({error: "hidden"})
                }
                this.navigation.navigate('Home', {workouts: [ //test data, will be replaced with database data in the future
                {
                    name: 'Chest Day',
                    desc: 'This chest day focuses primarily on chest, with a bit of tricep work',
                    exercises: [
                        {
                            excName: 'DB Bench',
                            excDesc: 'Perform the dumbbell bench press exercise by lying flat on your back on a bench and push dumbbells up and retract'
                        },
                        {
                            excName: 'Chest Flies',
                            excDesc: 'Sit at machine and pull fly bars, then retract'
                        }
                    ]
                },
                {
                    name: 'Bicep Day',
                    desc: 'This bicep day focuses primarily on biceps, with a bit of forearm work',
                    exercises: [
                        {
                            excName: 'EZ Bar Curls',
                            excDesc: 'Pull bar up to chest then retract'
                        }
                    ]
                }
            ]})
            }
            else{
                this.setState({error: "visible"})
            }

    }

    render(){
        return(
            <div>
                <img id = 'logo' src = {logo}></img>
                <center id = 'input'>
                    <label htmlFor = "email">Email: </label>
                    <input type = "text" id = "email" className = "fields" name = "email"></input>

                    <div id = 'passInfo'>
                        <label htmlFor = "pass">Password: </label>

                        <input type = "text" id = "pass" className = "fields" name = "pass"></input>
                    </div>
                    
                    <br></br>
                    <button type = "button" class = 'button' onClick={() => this.signUpOnClick(document.getElementById('email').value)}>Sign Up</button>
                    <button testID = 'loginTest' type = "button" class = 'button' onClick={() => this.loginOnClick(document.getElementById('email').value, document.getElementById('pass').value)}>Login</button>
                    <p testID = 'error' style={{visibility: this.state.error}}>Error: Please enter a valid account</p>
                </center>
            </div>
        )
    }
}

export default function Landing({navigation}){
    return(
        <LandingComp navigation = {navigation}></LandingComp>
    )
}