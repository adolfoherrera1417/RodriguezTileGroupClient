/* 
    Name: Tiles.js
    Created by: Adolfo Herrera
    Created on: July 6, 2019
    Last Updated: July 27, 2019
    Purpose: Main Component used to render all the tiles.
*/

import React, { Component } from "react";
import "./Tiles.css";
import Navbar from '../navbar/NavBar'
import axios from 'axios'
import Tile from './Tile'
import {CardDeck} from 'react-bootstrap'

class Tiles extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tiles: []
    }

  }

  componentDidMount() {
    axios.get('/api/tiles').then(res => {
      this.setState({
        tiles: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  renderTilesList() {
  
    try{
      return(this.state.tiles.map((tile,id)=>{
        return <Tile tileThing={tile} key={id}/>
      }))
    } catch(e) {
      console.log(e)
    }
      
  }

  render() {

    return (

      <div className="Home">

        <div className="App container">
          <Navbar />
        </div>

        <div className="lander">
          <h3>List of Tiles</h3>

          <CardDeck className='justify-content-center' style={{marginTop: 35, marginBottom:35}}>
            {this.renderTilesList()}
          </CardDeck>
          
        </div>

        
      </div>
    )
  }
}

export default Tiles