const getPagination = (page, size) => {
    const limit = size ? +size : 3 // default
    console.log(limit, page)
    const offset = page ? page * limit : 0 // default
    return {
        offset,
        limit
    }
}

const getPaginationData = (data, page, size) => {
    const { count: totalItems, rows: photos} = data
    const currentPage = page ? +page : 0 
    const totalPages = Math.ceil(totalItems / size)

    return {
        totalItems,
        photos,
        currentPage,
        totalPages
    }
}

module.exports = {
    getPagination,
    getPaginationData
}