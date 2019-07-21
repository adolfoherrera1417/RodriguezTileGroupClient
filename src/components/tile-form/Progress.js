import React from 'react'
import PropTypes from 'prop-types'
import {ProgressBar} from 'react-bootstrap'

const Progress = ({ percentage }) => {
    return (
        <div>
            <ProgressBar striped variant="success" now={percentage} />
            {percentage}%
        </div>
        
    )
}

Progress.propTypes = {
    percentage: PropTypes.number.isRequired,
}

export default Progress
