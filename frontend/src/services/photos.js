import axios from 'axios'
import { BASE_API_URL } from '../utils/constants'

const getAll = async (page=0, size=5) => {
    const response = await axios.get(`${BASE_API_URL}?page=${page}&size=${size}`)
    return response.data
}

const create = async (newPhoto) => {

    const response = await axios.post(BASE_API_URL, newPhoto)
    return response.data
}

const update = async (id, newPhoto) => {
    const response = await axios.put(`${BASE_API_URL}/${id}`, newPhoto)
    return response.data
}

const remove = async (id) => {
    const response = await axios.delete(`${BASE_API_URL}/${id}`)
    return response.data
}

const photoService = {
    getAll,
    create,
    update,
    remove
}

export default photoService