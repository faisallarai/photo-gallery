require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const multer = require('multer')

// models
const { User, Photo, sequelize } = require('./models')
const { Op } = require('sequelize')
const { getPagination, getPaginationData } = require('./utils/pagination')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads")
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '_' + file.originalname)
//     }
// })

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            cb(new Error("Upload only images with jpeg or jpg or png"))
        }
        
        cb(null, true)
        
    }
}).single('photo')

const app = express()
app.use(cors())


app.use(morgan('dev'))

const PORT = process.env.PORT

app.post('/api/photos', async (req, res) => {

    const uploadSync = (req, res) => {
        return new Promise((resolve, reject) => {
            upload(req, res, (err) => { 
  
                if (err instanceof multer.MulterError) {
                    console.log('m', err.message, req.file)
                    reject(err)
                } else if (err) {
                    console.log('g', err.message, req.file)
                    reject(err)
                }
                else { 
                    console.log('r', req.file)
                    resolve(req.file)
                } 
            }) 
        })
    }

    try {
        const response = await uploadSync(req, res)
        if(response) {
            const photo = await Photo.create({
                name: response.originalname,
                type: response.mimetype,
                image: response.buffer
            })
            
            if (photo) {
                console.log('photo', photo)
                res.json({
                    id: photo.id
                })
            }
        }
    } catch (error) {
        console.log('uploadsync err', error.message)
        res.status(500).send(error.message)
    }
    
}, (error) => {
    console.log('final catch', error.message)
    res.status(500).send(error.message)
})

app.get('/api/photos', async (req, res) => {
    try {
        const { type, page, size } = req.query

        const condition = type ? {
            type: {
                [Op.like]: `%${type}%`
            }
        } : null

        const { offset, limit } = getPagination(page, size)

        const photos = await Photo.findAndCountAll({
            attributes: ['id'],
            where: condition,
            order: [
                ['createdAt', 'ASC'],
            ],
            offset: offset,
            limit: limit
        })

        if(photos) {
            const response = getPaginationData(photos, offset, limit)
            res.json(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/api/photos/:id', async (req, res) => {

    try {
        const { id } = req.params
        const photo = await Photo.findByPk(id)

        if(photo) {
            res.set('Content-Type', photo.type)
            res.send(photo.image)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})