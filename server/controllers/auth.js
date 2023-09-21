import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName, lastName, email, password: passwordHash, picturePath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 1000), impressions: Math.floor(Math.random() * 1000)
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/* LOGIN USER */
export const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "user does not exist" })

        const isMatch = await bcrypt.compare
        // const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body

        // const salt = await bcrypt.genSalt(10)
        // const passwordHash = await bcrypt.hash(password, salt)

        // const newUser = new User({
        //     firstName, lastName, email, password: passwordHash, picturePath, friends, location, occupation, viewedProfile: Math.floor(Math.random() * 1000), impressions: Math.floor(Math.random() * 1000)
        // })

        // const savedUser = await newUser.save();
        // res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
