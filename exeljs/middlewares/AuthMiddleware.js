const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load the environment variables
dotenv.config();

async function authentication(req, res, next) {
    try {
        const authHeader = req.headers.authorization; // <-- fixed here

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided or token format invalid" });
        }

        const token = authHeader.replace("Bearer ", ""); // <-- fixed here
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const user = await Users.findById(decodedToken.id);

        if (!user) {
            return res.status(403).json({ error: "You are unauthorized" });
        }

        req.user = user; // attach the user to request
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

module.exports = authentication;
