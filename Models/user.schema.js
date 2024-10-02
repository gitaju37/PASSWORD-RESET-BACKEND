import mongoose from 'mongoose'



const userSchema = mongoose.Schema( {
    userName: String,
    email: String,
    password: String,
    pwdverifyString: {
        type: String,
        default:null 
    },
    resetTime: {
        type: Number,
        default:null
    }
} )

const User = mongoose.model( "user", userSchema )
export default User