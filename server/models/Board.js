const mongoose = require("mongoose");

const Board = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Board", Board);