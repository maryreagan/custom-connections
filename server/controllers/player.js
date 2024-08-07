const router = require("express").Router();
const Player = require("../models/Player");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT = Number(process.env.SALT);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Get all players
router.get("/", async (req, res) => {
    try {
        const findAll = await Player.find({});
        res.status(200).json({ message: "Success", data: findAll });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a player by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const findPlayer = await Player.find({ _id: id });
        res.status(200).json(findPlayer);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Register a player
router.post("/register", async (req, res) => {
    const newPlayer = new Player(req.body);
    try {
        if(!newPlayer.email.includes("@")){
            res.status(400).json({message: "Invalid email format"});
        } else {
            const hashedPassword = bcrypt.hashSync(newPlayer.password, SALT);
            newPlayer.password = hashedPassword;
            const savePlayer = await newPlayer.save();
            res.status(200).json({ message: "Success", data: savePlayer });
        }
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({message: "Email already exists"});
        } else {
            res.status(500).json(err);
        }
    }
});

// Login a player
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const findPlayer = await Player.findOne({ email: email });
        if (findPlayer) {
            const validPassword = await bcrypt.compare(
                password,
                findPlayer.password
            );
            if (!validPassword) {
                res.status(400).json({message: "Invalid email or password"});
            } else {
                const token = jwt.sign({ _id: findPlayer._id }, JWT_SECRET_KEY);
                res.status(200).json(token);
            }
        } else {
            res.status(400).json({message: "Invalid email or password"});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a player
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatePlayer = await Player.findByIdAndUpdate(id, {
            $set: req.body,
        });
        res.status(200).json(updatePlayer);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a player
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletePlayer = await Player.findByIdAndDelete(id);
        res.status(200).json(deletePlayer);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
