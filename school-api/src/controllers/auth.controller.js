import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // VALIDATE PASSWORD
        if (password.length < 8) return res.status(401).json({ message: "Password must be atleast 8 characters" })
        
        // VALIDATE IF EMAIL EXIST
        const existingEmail = await db.User.findOne({ where: { email } });
        if (existingEmail) return res.status(400).json({ message: "Email is already in use" })
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const jwtSecretKey = process.env.JWT_SECRET_KEY
        
        // CREATE NEW USER DATA (REGISTER)
        const newUser = await db.User.create({
            name, 
            email, 
            password: hashedPassword
        })

        // CREATE JWT
        const token = jwt.sign({id: newUser.id}, jwtSecretKey)

        res.status(201).json({message: "Test but work", token});
    } catch (err) {
        res.status(500).json({message: "Test but error"})
    }
}

export const login = async (req, res) => {
    try {
        console.log("Called Login")
        const { email, password } = req.body

        // VALIDATE IF THE USER EXIST
        const existingUser = await db.User.findOne({ where: { email } })
        if (!existingUser) return res.status(400).json({ message: "User doesn't exist" })

        // VALIDATE IF THE PASSWORD IS CORRECT
        const checkPassword = await bcrypt.compare(password, existingUser.password)
        if (!checkPassword) return res.status(400).json({ message: "Password is incorrect" })

        // CREATE TOKEN
        const jwtSecretKey = process.env.JWT_SECRET_KEY
        const token = jwt.sign({id: existingUser.id}, jwtSecretKey)
        
        res.status(201).json({ message: "Test but work", token });
    } catch (err) {
        res.status(500).json({ err })
    }
}