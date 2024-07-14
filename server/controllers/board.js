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

// Create a board
router.post("/", async (req, res) => {
    const newBoard = new Board(req.body);
    try{
        const saveBoard = await newBoard.save();
        res.status(200).json(saveBoard);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update a board
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const updateBoard = await Board.findByIdAndUpdate(id, {$set: req.body});
        res.status(200).json(updateBoard);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

// Delete a board
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const deleteBoard = await Board.findByIdAndDelete(id);
        res.status(200).json(deleteBoard);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
