import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CustomPagination from './Pagination'
import Photo from './Photo'

const Gallery = () => {
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        setIsLoading(true)
    }, [])

    const {totalItems, ids, currentPage, totalPages} = useSelector(state => state.photos)

    useEffect(() => {
        console.log('when photos changes', ids)
        if(ids) {
            setIsLoading(false)
        }
    }, [ids])


    return (

        <>
        <div>
            <h3 onClick={() => history.push('/')}>Back</h3>
        </div>
        <div className="photos-list">
            {isLoading ? <div className="loading-msg centered-message"> Loading ...</div> 
            : typeof ids !== 'undefined' ? 
            ids.map((data, index) => {
                return (
                    <Photo key={index} id={data.id} />
                )
            })
            : null
            }
        </div>
        <CustomPagination totalItems={totalItems} totalPages={totalPages} currentPage={currentPage} />
        </>
    )
}

export default Gallery