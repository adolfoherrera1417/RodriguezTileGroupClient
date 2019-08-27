/* 
    Name: AddTileForm.js
    Created by: Adolfo Herrera
    Created on: July 6, 2019
    Last Updated: July 17, 2019
    Purpose: Entire add tile FORM in a single componet requires other sub components to work!

    TODO: restructure buttons to include .id instead of .value
    TODO: make sure that if it reloads display what the error is
    TODO: Should there be a properties for location and description?
    TODO: Clean up entire render function split up components
*/

import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, Row, Col } from 'react-bootstrap';
import './AddTileForm.css'
import FileUpload from './FileUpload'
import Progress from './Progress'

class AddTileForm extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            name: '',
            type: '',
            other: [],
            placement: [],
            finish: [],
            properties: [],
            selectedFileName: '',
            selectedFile: [],
            length: 0,
            width: 0,
            setUploadPercentage: 0,
        }

        this.baseState = this.state
        this.handleSizeChange = this.handleSizeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handlePhotoChange = this.handlePhotoChange.bind(this)
        this.handleCheckBoxes = this.handleCheckBoxes.bind(this)
    }

    handleCheckBoxes(event) {
        const newSelection = event.target.value
        const name = event.target.name 
        let newSelectionArray
        
        if (this.state[name].indexOf(newSelection) > -1) {
            newSelectionArray = this.state[name].filter(s => s !== newSelection)
        } else {
            newSelectionArray = [...this.state[name],newSelection]
        }
        this.setState( prevState => ({
            ...prevState,
            [name]: newSelectionArray
        })) 
    }

    handleTypeChange(event) {
       this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlePhotoChange(event) {
        const fileName = this.state.selectedFileName.concat(event.target.files[0].name)
        this.setState({
            selectedFile: [...this.state.selectedFile, event.target.files[0]],
            selectedFileName: fileName
        }, (res) => {
            console.log(this.state.selectedFile)
        })
    }

    handleSizeChange(event) {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        const data = new FormData()
        data.append('avatar',this.state.selectedFile[0])

        for (let i = 1; i < this.state.selectedFile.length; i++) {
            data.append('gallery',this.state.selectedFile[i])
        }
        
        JSON.stringify(this.state)

        data.append('state',JSON.stringify(this.state))

        //TODO: put a try catch around axios 
        axios.post('/api/tiles',data,{
            headers: {
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    setUploadPercentage: (parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                })
            }
        }).then(res => {
            document.getElementById('create-tile-form').reset();
            this.setState(this.baseState)
        })


    }

    render() {
        return(
            <div className='add' >

                <Form onSubmit={this.handleSubmit} id='create-tile-form'>
                    <Form.Group>
                        <Form.Label>Tile name</Form.Label>
                        <Form.Control autoFocus placeholder='Enter name of tile' onChange={this.handleTypeChange} name='name'/>
                    </Form.Group>

                    <fieldset>
                        <Form.Group as={Row}>

                            <Form.Label as='legend' >Type</Form.Label>
                            <Col sm={10}>
                    
                                <Form.Check type='radio' label='Ceramic' name='type' onClick={this.handleTypeChange} value='ceramic' />
                                <Form.Check type='radio' label='Porcelain' name='type' onClick={this.handleTypeChange} value='porcelain' />
                                <Form.Check type='radio' label='Durabody' name='type' onClick={this.handleTypeChange} value='durabody'/>
                                <Form.Check type='radio' label='Fullbody' name='type' onClick={this.handleTypeChange} value = 'fullbody'/>
                            </Col>

                        </Form.Group>
                    </fieldset>

                    {/* TODO: onClick might need to change to onChange */}
                    <Form.Group as={Row}>

                        <Form.Label>Other</Form.Label>

                        <Col sm={10}>
                            <Form.Check label='Residential' name='other' onClick={this.handleCheckBoxes} value='residential'/>
                            <Form.Check label='Commercial' name='other' onClick={this.handleCheckBoxes} value='commercial'/>
                            <Form.Check label='Rectified' name='other' onClick={this.handleCheckBoxes} value='rectified'/>
                            <Form.Check label='White Body' name='other' onClick={this.handleCheckBoxes} value='whiteBody'/>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row}>

                        <Form.Label>Placement</Form.Label>

                        <Col sm={10}>
                            <Form.Check label='Wall' value='wall' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Floor' value='floor' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Interior' value='interior' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Exterior' value='exterior' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Living Room' value='livingRoom' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Dinning Room' value='dinningRoom' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Bedroom' value='bedroom' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Kitchen' value='kitchen' onClick={this.handleCheckBoxes} name='placement' />
                            <Form.Check label='Bathroom' value='bathroom' onClick={this.handleCheckBoxes} name='placement' />
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row}>

                        <Form.Label>Finish</Form.Label>

                        <Col sm={10}>
                            <Form.Check label='Gloss' value='gloss' onClick={this.handleCheckBoxes} name='finish' />
                            <Form.Check label='Satin' value='satin' onClick={this.handleCheckBoxes} name='finish' />
                            <Form.Check label='Matte' value='matte' onClick={this.handleCheckBoxes} name='finish' />
                            <Form.Check label='Ink Jet' value='inkjet' onClick={this.handleCheckBoxes} name='finish' />
                            <Form.Check label='Polished' value='polished' onClick={this.handleCheckBoxes} name='finish' />
                            <Form.Check label='Structure' value='structure' onClick={this.handleCheckBoxes} name='finish' />
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row}>

                        <Form.Label>Properties</Form.Label>

                        <Col sm={10}>
                            <Form.Check label='Unique Faces' value='uniqueFaces' onClick={this.handleCheckBoxes} name='properties' />
                            <Form.Check label='V2' value='v2' onClick={this.handleCheckBoxes} name='properties' />
                            <Form.Check label='V3' value='v3' onClick={this.handleCheckBoxes} name='properties' />
                            <Form.Check label='V4' value='v4' onClick={this.handleCheckBoxes} name='properties' />
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row}>

                        <Form.Label>Size</Form.Label>
                        <Form.Control placeholder='Length' onChange={this.handleSizeChange} name='length' id='size'/>
                        <Form.Control placeholder='Width' onChange={this.handleSizeChange} name='width' id='size'/>

                    </Form.Group>


                    <FileUpload controlFunc={this.handlePhotoChange} fileName={this.state.selectedFileName}/>


                    <Progress percentage={this.state.setUploadPercentage}/>
                    <Button variant='primary' type='submit'>
                        Add
                    </Button>
                </Form>
            </div>
        )
    }
}

export default AddTileForm