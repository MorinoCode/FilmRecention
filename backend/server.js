// import moduls
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './configs/db.js'
import cors from 'cors'  

//import Routes
import userRouter from './controllers/userRouter.js'
import movieRouter from './controllers/movieRouter.js'
import reviewsRouter from './controllers/reviewsRouter.js'

//loading envoirment variables
dotenv.config()
const port = process.env.PORT || 8080

// initialis app
const app = express()

//connection to the database
connectDB()

//middlewares
app.use(cors())     
app.use(express.json())

//Routes
//User Routes
app.use('/users' , userRouter)

//Movie Routes
app.use('/movies' , movieRouter)

//recention Routes
app.use('/recention' , reviewsRouter)


//connect app to server
app.listen( port , () => {
    console.log(`✅ app is connectet to port ${port}`);
})




