const getPagination = (page, size) => {
    const limit = size ? +size : 3 // default
    const offset = page ? page * limit : 0 // default
    return {
        offset,
        limit
    }
}


const getPaginationData = (data, page, limit) => {
    const { count: totalItems, rows: photos } = data
    
    // const currentPage = page ? +page : 0 
    const currentPage = Math.floor(page / limit)

    const totalPages = Math.ceil(totalItems / limit)

    return {
        totalItems,
        ids: photos,
        currentPage,
        totalPages
    }
}

module.exports = {
    getPagination,
    getPaginationData
}