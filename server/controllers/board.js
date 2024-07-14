const router = require('express').Router();
const Board = require('../models/Board');
require('dotenv').config();

// Get all boards
router.get("/", async (req, res) => {
    try{
        const findAll = await Board.find({});
        res.status(200).json(findAll);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a board by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const findBoard = await Board.find({_id: id});
        res.status(200).json(findBoard);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
