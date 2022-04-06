import express from 'express'
import dotenv from 'dotenv'
import indexRoutes from './routes/index.js'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoutes)

app.listen(5000, ()=>{
    console.log('Serving is running at port 3000!')
})

export default app
