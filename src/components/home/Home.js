/* 
  Name: Home.js
  Created by: Adolfo Herrera
  Created on: July 6, 2019
  Last Updated: July 17, 2019
  Purpose: Serves as the main screen after having a successful login

  TODO: Technically this is the add tile component
  TODO: Move CSS over to reduce # of files
*/

import React, { Component } from "react";
import "./Home.css";
import AddTileForm from '../tile-form/AddTileForm'
import NavBar from '../navbar/NavBar'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="App container">
          <NavBar />
        </div>
          <div className="lander">
          <h3>Add Tile</h3>
        </div>
        <AddTileForm/>
      </div>
    )
  }
}

export default Home