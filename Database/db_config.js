import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()


const connectDb = async () => {

    try {
        const connection = await mongoose.connect( process.env.mongoDBconnectingString )
    console.log("DB connected")
    return connection
    } catch ( error ) {
        console.log( error )
        res.status(404).send("INTERNAL SERVER ERROR")
        
    }
}

export default connectDb