/* 
    Name: TileModal.js
    Created by: Adolfo Herrera
    Created on: August 17, 2019
    Last Updated: August 17, 2019
    Purpose: Showcase multiple images of tile selected

    TODO: add a page navigator only render 5-10 tiles at a time if not will make server crash
    TODO: Do not request tile gallery
*/

import React, { Component } from 'react'
import {Modal, Button, Carousel} from 'react-bootstrap'
import {_arrayBufferToBase64} from '../../helpers/convert'
import axios from 'axios'

export default class TileModal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            gallery: []
        }
    }

    componentDidUpdate(prevProps) {
      if (this.props.tileid !== prevProps.tileid) {

        axios.get('/api/tiles/'+ this.props.tileid + '/gallery').then(res => {
          const imgGallery = res.data.map((img) => {
              const base64Flag = 'data:image/jpeg;base64,'
              const imageStr = _arrayBufferToBase64(img.data)
              return base64Flag + imageStr
          })
          
          this.setState((prevState) => ({
            gallery: imgGallery
          }))
      })
      }
    }

    renderGallery() {
      return this.state.gallery.map((img, id) => {
          return (
              <Carousel.Item key={id}>
                  <img
                      src={img}
                      alt="First slide"
                  />
                  <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
              </Carousel.Item>
          )
      })
    }

    render() {
        return (
            <Modal
            {...this.props} 
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Modal heading
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                  dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                  consectetur ac, vestibulum at eros.
                </p>
                <Carousel>
                        {this.renderGallery()}
                </Carousel>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
    }
}