require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/movieRouter'))
app.use('/api', require('./routes/showRouter'))
app.use('/api', require('./routes/orderRouter'))

//Ket noi voi mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB')
})

//Su dung port 5000 neu khong dat PORT trong .env
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})