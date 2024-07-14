const mongoose = require("mongoose");

const Player = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        createdBoards: {
            type: Array
        },
        completedBoards: {
            type: Array
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Player", Player);