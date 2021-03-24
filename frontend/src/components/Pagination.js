import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifications'
import { setPage } from '../reducers/pages'
import { listPhotos } from '../reducers/photos'


const CustomPagination = ({ totalItems, currentPage, totalPages }) => {

    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const dispatch = useDispatch()

    const handlePage = (page) => {
        try {
            setPageNumber(page)
            dispatch(listPhotos(page, pageSize))
        } catch (error) {
            dispatch(setNotification({
                success: false,
                message: error.message
            }))
        }
        
    }

    let items = [];
    for (let number = 0; number < totalPages; number++) {
        items.push(
            <Pagination.Item onClick={() => handlePage(number)} key={number} active={number === pageNumber}>
            {number}
            </Pagination.Item>,
        )
    }

    const sizes = [5, 10, 15, 20, 25, 30, 35, 40]

    const handleSize = (e) => {
        console.log(e.target.value)
        setPageSize(e.target.value)
        setPageNumber(0)
        dispatch(listPhotos(pageNumber, e.target.value))
    }

    return (
        <div>
            <select onChange={handleSize} value={pageSize}>
                {sizes.map((size, index) => <option key={index} value={size}>{size}</option>)}
            </select>
            <Pagination>{items}</Pagination>
        </div>
    )
}

export default CustomPagination