import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Photo from './Photo'

const Gallery = () => {
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        console.log('beg', photos)
        setIsLoading(true)
    }, [])

    const {totalItems, photos, currentPage, totalPages} = useSelector(state => state.photos)

    useEffect(() => {
        console.log('when photos changes', photos)
        if(photos) {
            setIsLoading(false)
        }

    }, [photos])



    return (

        <>
        <div className="photos-list">
        <div>
            <h3 onClick={() => history.push('/')}>Back</h3>
        </div>
            {isLoading ? <div className="loading-msg centered-message"> Loading ...</div> 
            : typeof photos !== 'undefined' ? 
            photos.map(photo => {
                return (
                    <Photo key={photo.id} id={photo.id} />
                )
            })
            : null
            }
        </div>
        </>
    )
}

export default Gallery