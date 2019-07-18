/* 
  Name: Login.js
  Created by: Adolfo Herrera
  Created on: July 6, 2019
  Last Updated: July 17, 2019
  Purpose: Serves as the main and only login screen. MUST BE LOGGED IN TO ACCESS ANY OF THE SITES CONTENT

  TODO: will recieveing images be faster than serving them up on the server side?
  Like return the binary image and convert on front end
  TODO: Get your own copy of the logo image
*/

import React, { Component } from "react";
import { Image, Button, Form } from "react-bootstrap";
import axios from 'axios'
import "./Login.css";

class Login extends Component {

    constructor(props) {
        super(props)

        this.state= {
            username: '',
            password: '',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        axios.post('users/login', {
            "username": this.state.username,
            "password": this.state.password
        }).then((res) => {
            localStorage.setItem('cool-jwt',res.data.token)
            this.props.history.push('/')
        }).catch((error) => {
            console.log(error.response.data.error)
            this.setState({
                error: error.response.data.error
            })
        })
    }

    render() {
        return(
            <div className="Login">
                <Image src='http://rodrigueztilegroup.net/wp-content/uploads/2018/07/LOGO-RTGROUP-HIGH-RESOLUTION-LOGO-copy-1.png' fluid />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control autoFocus placeholder="Enter username" onChange={this.handleChange} name="username" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange} name="password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login!
                    </Button>
                    <Form.Text style={{color:'red',fontSize:20,marginTop:20}}>{this.state.error}</Form.Text>
                </Form>
            </div>
        )
    }
}

export default Login