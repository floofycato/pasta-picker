import user_model from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const userProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        // check if no token provided
        if(!token) {
            return res.status(401).json({error: "Unauthorize: no token provided"})
        }

        //check if token provided is correct
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({error: "Unauthorize: Invalid Token"})
        }

        const user = await user_model.findById(decode.userID).select("-password")

        //check if no user
        if(!user){
            return res.status(404).json({error: "user not found"})
        }

        req.user = user
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'bad request'})
    }
}