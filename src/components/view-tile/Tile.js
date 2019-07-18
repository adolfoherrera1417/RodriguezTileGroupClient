/* 
    Name: Tile.js
    Created by: Adolfo Herrera
    Created on: July 6, 2019
    Last Updated: July 17, 2019
    Purpose: SubComponent for Tile.js. Renders a list of all the tiles currently in database

    TODO: add a page navigator only render 5-10 tiles at a time if not will make server crash
*/

import React, { Component } from 'react'
import {Card} from 'react-bootstrap'

class Tile extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            type: '',
            other: [],
            placement: [],
            finish: [],
            properties: [],
            _id: ''
        }
    }

    componentDidMount() {
        this.setState(
            this.props.tile
        )
    }

    render() {
        return (
            <div className='col-auto md-4'>
            <Card style={{marginTop: 10, marginBottom:10, width:"10rem"}} >
                
                <Card.Img className="img-fluid" variant="top" src={'tiles/'+ this.state._id + '/avatar'}/>
        
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                        {this.state.type}
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default Tile