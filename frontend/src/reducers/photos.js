import photoService from "../services/photos"
import { setNotification } from "./notifications"

const SET_PHOTO = 'SET_PHOTO'
const LOAD_PHOTOS = 'LOAD_PHOTOS'
const LOAD_MORE_PHOTOS = 'LOAD_MORE_PHOTOS'

const photosReducer = (state={}, action) => {
    switch(action.type) {
        case SET_PHOTO:
            return {...state, ids: [...state.ids, action.data]} // {...state, ids: state.ids.concat(action.data)} // {...state, ids: [...state.ids, action.data]}
        case LOAD_PHOTOS:
            return action.data
        case LOAD_MORE_PHOTOS:
            return [...state, action.data]
        default:
            return state
    }
}

export const setPhoto = (photo) => {
    return {
        type: SET_PHOTO,
        data: photo
    }
}

export const loadPhotos = (photos) => {
    return {
        type: LOAD_PHOTOS,
        data: photos
    }
}

export const loadMorePhotos = (photos) => {
    return {
        type: LOAD_MORE_PHOTOS,
        data: photos
    }
}

export const listPhotos = (page, size) => {
    return async dispatch => {
        try {
            const response = await photoService.getAll(page, size)
            console.log('photos', response)
            return dispatch(loadPhotos(response))
        } catch (error) {
            return error.response && dispatch(setNotification({
                success: false,
                message: error.response.data
            }))
        }
    }
}

export const uploadPhoto = (photo) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('photo', photo)

            console.log('formData', formData.get('photo'))
            const response = await photoService.create(formData)
            console.log('photo id', response.id)

            return dispatch(setPhoto(response))
        } catch (error) {
            console.log('error', error)
            return error.response && dispatch(setNotification({
                success: false,
                message: error.response.data,
            }))
        }
        
    }
}

export default photosReducer