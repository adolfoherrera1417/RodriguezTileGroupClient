/* 
    Name: FileUpload.js
    Created by: Adolfo Herrera
    Created on: July 6, 2019
    Last Updated: July 17, 2019
    Purpose: Serves as a sub component for AddTileForm.js. This file allows image uplading

    //TODO: Allow more than one image onto upload
*/

import React from 'react'

const divStyle = {
    marginTop: 10,
    marginBottom: 10
}

const FileUpload = (props) => {
    return (
        <div className='custom-file' style={divStyle}>
            <input type = 'file' className='custom-file-input' id='customFile' onChange={props.controlFunc}/>
            <label className='custom-file-label' htmlFor='customFile'>
                {props.fileName}
            </label>
        </div>
    )
}

export default FileUpload