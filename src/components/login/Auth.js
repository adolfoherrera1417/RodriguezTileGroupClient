/* 
  Name: Auth.js
  Created by: Adolfo Herrera
  Created on: July 6, 2019
  Last Updated: July 17, 2019
  Purpose: Serves as a sort of middleware for authentication routes dealing
  with Router-Naviation Module
*/

import React, {Component} from 'react'
import {getJWT} from '../../helpers/jwt'
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class Auth extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getJWT()
        if (!jwt) {
            this.props.history.push('/Login')
        }
        axios.get('/api/users',{headers: {Authorization: 'Bearer '+ jwt }}).then((res) => {
            this.setState({
                user: res.data
            })
        }).catch(error => {
            localStorage.removeItem('cool-jwt')
            this.props.history.push('/Login')
        })
    }

    render() {
        if(this.state.user === undefined) {
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Auth)