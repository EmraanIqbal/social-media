import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path'
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js"
import authRoutes from './routes/auth.routes.js'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url); // https://nodejs.org/docs/latest-v14.
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

// Routes With Files
app.post('/auth/register', upload.single('picture'), register)

/* ROUTES */
app.use('/auth', authRoutes)

/* MONGOOSE SETUP */
const port = process.env.PORT || 8001

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log('App is Listening on Port: ' + port))
}).catch((err) => {
    console.error(`Error connecting to mongo: ${err}`)
})