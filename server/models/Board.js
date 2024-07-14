const mongoose = require("mongoose");

// Schema for the categories, there will be 4 categories, each with a different difficulty. Contains 4 items each
// Items are the individual cards that will be displayed on the board
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    items: {
        type: [String],
        maxLength: 4,
        required: true
    }
})

// Outer schema, contains the name of the board and all of it's contents
const Board = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        boardContent: {
            type: [categorySchema],
            maxLength: 4,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Board", Board);