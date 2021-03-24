import React from 'react'
import { Card } from 'react-bootstrap'
import { BASE_API_URL } from '../utils/constants'

const Photo = ({ id }) => {
    console.log(id)
    return (
        <Card className="photo">
        <Card.Img
            variant="top"
            src={`${BASE_API_URL}/${id}`}
            alt="Photo" 
        />
        </Card>
    )
}

export default Photo