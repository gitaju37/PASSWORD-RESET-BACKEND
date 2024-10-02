import User from "../Models/user.schema.js";
import bcrypt from 'bcryptjs';
import mail from '../Services/nodemailer.service.js';

export const createUser = async ( req, res ) => {
    try {
        const { userName, email, password } = req.body;
        const user = await User.findOne( { email } );

        if ( user ) {
            return res.status( 400 ).json( { message: 'EMAIL ALREADY EXISTS' } );
        }

        const hashPassword = await bcrypt.hash( password, 10 );
        const newUser = new User( { userName, email, password: hashPassword } );
        await newUser.save();

        res.status( 201 ).json( { message: "REGISTRATION SUCCESSFUL" } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( "INTERNAL SERVER ERROR" );
    }
};

export const userLogin = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne( { email } );

        if ( !user ) {
            return res.status( 401 ).json( { message: "INVALID EMAIL" } );
        }

        const passwordMatch = await bcrypt.compare( password, user.password );
        if ( !passwordMatch ) {
            return res.status( 402 ).json( { message: "INVALID PASSWORD" } );
        }

        res.status( 200 ).json( { message: "LOGIN SUCCESSFUL" } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( "INTERNAL SERVER ERROR" );
    }
};

export const forgotPassword = async ( req, res ) => {
    const { email } = req.body;

    try {
        const user = await User.findOne( { email } );
        if ( !user ) {
            return res.status( 404 ).json( { message: "USER NOT EXISTS" } );
        }

        function generateRandomString( length ) {
            return Math.random().toString( 36 ).substring( 2, 2 + length );
        }

        const randomString = generateRandomString( 10 );
        const resetTime = new Date().getTime() + 600000;

        user.resetTime = resetTime;
        user.pwdverifyString = randomString;

        await user.save();

        await mail( email, randomString );

        res.status( 200 ).json( { message: "PASSWORD RESET LINK SENT TO EMAIL" } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "INTERNAL SERVER ERROR" } );
    }
};


export const changePassword = async ( req, res ) => {
    const { pwdverifyString, newPassword } = req.body;

    try {
        const user = await User.findOne( { pwdverifyString } );
        const currentTime = new Date().getTime();
        if ( !user ) {
            return res.status( 401 ).json( { message: "NOT MATCHED" } );
        }
        if ( user.resetTime < currentTime ) {
            user.pwdverifyString = null;
            user.resetTime = null;
            await user.save();
            return res.status( 404 ).json( { message: "link expired" } );
        }

        const hashPassword = await bcrypt.hash( newPassword, 10 );
        user.password = hashPassword;
        user.pwdverifyString = null;
        user.resetTime = null;

        await user.save();
        res.status( 200 ).json( { message: "PASSWORD CHANGED SUCCESSFULLY" } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "INTERNAL SERVER ERROR" } );
    }
};
