const usermodel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken')
const { where } = require('sequelize')

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await usermodel.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await usermodel.create({
            name,
            email,
            password: hashedPassword
        });
        let token = generateToken(newUser.id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.status(201).json({ message: "User created", user: { id: newUser.id, name: newUser.name, email: newUser.email } })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        let token = generateToken(user.id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}


exports.logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: "Logout successful" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

