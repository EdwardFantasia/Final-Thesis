//use of route source: https://www.youtube.com/watch?v=GkH_VeAeur8

import { React, Component} from 'react';

class SUComp extends Component{
    constructor(props){
        super(props)
        this.navigation = props.navigation
        this.route = props.route
    }
    render(){
        return(
            <div>
                <label id = 'fname'>First Name: </label>
                <input type = 'text' id = 'fname' className = 'signup'></input>
                <br />
                <label id = 'lname'>Last Name: </label>
                <input type = 'text' id = 'lname' className = 'signup'></input>
                <br />
                <label id = 'email'>Email: </label>
                <input type = 'email' id = 'email' className = 'signup' value = {this.route.params.email}></input>
                <br />
                <label id = 'pw'>Password: </label>
                <input type = 'text' id = 'pw' className = 'signup'></input>
            </div>
        )
    }
}

export default function Signup({navigation, route}){
    return(
        <SUComp navigation = {navigation} route = {route} />
    )
}