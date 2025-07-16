import jwt from "jsonwebtoken";
import dotenv from "dotenv"

export const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const secretKey = process.env.JWT_SECRET_KEY
        
        if (!token) return res.status(401).json({ message: "No token provided" })
        
        const decoded = jwt.verify(token, secretKey)
        if (!decoded) return res.status(400).json({ message: "Not authorized" })

        req.user = decoded
        // console.log(decoded)
        next()
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}