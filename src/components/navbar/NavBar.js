/* 
  Name: NavBar.js
  Created by: Adolfo Herrera
  Created on: July 6, 2019
  Last Updated: July 17, 2019
  Purpose: Component to render a NavBar on all pages

  TODO: need to understand what this is doing withRouter look at bottom
  TODO: Figure out how to pass active props
*/

import React, { Component } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import axios from 'axios'
import { Link, withRouter} from 'react-router-dom'; 
import {getJWT} from '../../helpers/jwt'

const divStyle = {
  marginLeft: 10,
  marginRight: 10
}

export class NavBar extends Component {

  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(event) {
    event.preventDefault()
    const jwt = getJWT()
    console.log(jwt)
    axios.post('/api/users/logout', {}, { headers: { Authorization: 'Bearer ' + jwt } }).then((res) => {
      localStorage.removeItem('cool-jwt')
      this.props.history.push('/Login')
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <Navbar className="justify-content-between">
        <Nav>
          <Nav.Item>
            <Link to='/' style={divStyle}>Add</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/tiles' style={divStyle}>Tiles</Link>
          </Nav.Item>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Button variant="dark" onClick={this.handleLogout}>Logout</Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    )
  }
}

export default withRouter(NavBar)