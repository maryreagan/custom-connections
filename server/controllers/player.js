const router = require('express').Router();
const Player = require('../models/Player');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT = process.env.SALT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Get all players
router.get("/", async (req, res) => {
    try{
        const findAll = await Player.find({});
        res.status(200).json(findAll);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
