import { StatusCodes } from "http-status-codes";
import User from '../model/UserModel.js';
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from '../error/customError.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the email and password are provided
        if (!email || !password) {
            throw new UnauthenticatedError("Email and password are required");
        }

        // Find the user by email in the database
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            throw new UnauthenticatedError("Invalid Email or Password");
        }

        // Check if the provided password matches the stored hashed password
        const isValidUser = await comparePassword(password, user.password);

        if (!isValidUser) {
            throw new UnauthenticatedError("Invalid Email or Password");
        }

        // Create a JWT token for the user
        const token = createJWT({ userId: user._id, role: user.role });

        // Set the token in a secure, HTTP-only cookie
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV === 'production',
        });

        // Send a success response
        res.status(StatusCodes.OK).json({ msg: 'User logged in' });
    } catch (error) {
        // Handle any errors and pass them to the error middleware
        next(error);
    }
};


// export const login = async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });
//     //console.log(user);
//     console.log('Input Password:', req.body.password);
//     console.log('Stored Password:', user.password);
//     const isValidUser = user && (await comparePassword(req.body.password, user.password));
//     console.log('Is Valid User:', isValidUser);

//     // const isValidUser = user && (await comparePassword(req.body.password, user.password));
//     // console.log(isValidUser);
//      if (!isValidUser) return next(new UnauthenticatedError("Invalid Email or Password"));
//     // //if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

//     const token = createJWT({ userId: user._id, role: user.role })
//     const oneDay = 1000 * 60 * 60 * 24;
//     res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + oneDay),
//         secure: process.env.NODE_ENV === 'production',
//     });
//     res.status(StatusCodes.OK).json({ msg: 'user logged in' });
// };




export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expries: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};