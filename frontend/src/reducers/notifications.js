const SET_NOTIFICATION = 'SET_NOTIFICATION'
const RESET_NOTIFICATION = 'RESET_NOTIFICATION'

const notificationsReducer = (state={}, action) => {
    switch(action.type) {
        case SET_NOTIFICATION:
            return action.data
        case RESET_NOTIFICATION:
            return action.data
        default:
            return state
    }
}

export const setNotification = (notification) => {
    return {
        type: SET_NOTIFICATION,
        data: notification
    }
}

export const resetNotification = () => {
    return {
        type: RESET_NOTIFICATION,
        data: {}
    }
}

export default notificationsReducer