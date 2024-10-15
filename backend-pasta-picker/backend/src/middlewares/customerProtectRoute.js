import customer_model from "../models/customerModel.js";
import jwt from "jsonwebtoken"

export const customerProtectRoute = async (req, res, next) => {
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

        const customer = await customer_model.findById(decode.userID).select("-password")

        //check if no user
        if(!customer){
            return res.status(404).json({error: "Customer not found"})
        }

        req.customer = customer
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'bad request'})
    }
}