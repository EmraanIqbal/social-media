import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {

    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}