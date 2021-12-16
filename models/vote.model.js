const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        voteName: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
        },
        end: {
            type: Boolean,
            required: true,
            default: false,
        },
        hasVoted: {
            type: [
                {
                    ip: {
                        type: String,
                        required: true,
                        unique: true,
                       
                    },
                },
            ],
            required: true,
        },
        choice: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                        unique: true,
                       
                    },
                    voteCount: {
                        type: Number,
                        default: 1,
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

const VoteModel = mongoose.model("vote", voteSchema);

module.exports = VoteModel;