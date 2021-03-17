import React, { useRef, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { resetNotification, setNotification } from '../reducers/notifications'
import { uploadPhoto } from '../reducers/photos'

const UploadForm = () => {

    const [state, setState] = useState(null)
    const photoInputRef = useRef()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        try {
            e.preventDefault()
            dispatch(uploadPhoto(state))
            .then(response => {
                console.log('response', response)
                if (typeof response.data.id === 'undefined') {
                    dispatch(setNotification({
                        success: false,
                        message: response.data.message
                    }))
                } else {
                    dispatch(setNotification({
                        success: true,
                        message: 'Uploaded photo successfully'
                    }))
                }
                
                setTimeout(() => {
                    dispatch(resetNotification())
                    setState(null)
                    photoInputRef.current.value = ''
                }, 3000);
            })
        } catch (error) {
            console.log('OOps something went wrong, try again', error.response)
            dispatch(setNotification({
                success: false,
                message: error.response.message
            }))

            setTimeout(() => {
                dispatch(resetNotification())
            }, 3000);
        }
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        console.log('file', file)
        setState(file)
    }

    return(
        <>
            <Form onSubmit={handleSubmit} method='post' encType='multipart/form-data' className='upload-form'>
                <Row>
                    <Col>
                    <Form.Group controlId="photo">
                        <Form.File 
                        name="photo"
                        id="photo"
                        label='Choose photo to upload'
                        onChange={handleChange}
                        ref={photoInputRef}
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                        <Button 
                        type="submit" 
                        className={!state ? 'disable submit-btn' : 'submit-btn'}  disabled={state ? false : true}>Upload</Button>
                    </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default UploadForm