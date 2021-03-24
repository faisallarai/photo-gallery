const SET_PAGE = 'SET_PAGE'

const pagesReducer = (state =0, action) => {
    switch(action.type) {
        case SET_PAGE:
            return action.data
        default:
            return state
    }
}

export const setPage = (pageNumber) => {
    return {
        type: SET_PAGE,
        data: pageNumber
    }
}

export default pagesReducer