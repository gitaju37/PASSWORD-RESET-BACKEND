import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './Database/db_config.js'
import userRoutes from './Routers/user.router.js'


const app = express()
dotenv.config()


app.use( cors() )
app.use( express.json() )







app.get( '/', (req,res) => {
    res.status(200).json("APP is Working Fine")
} )


connectDb()

app.use('/user',userRoutes)




app.listen( process.env.PORT, () => {
    console.log("APP is listening in the port:",process.env.PORT)
})



