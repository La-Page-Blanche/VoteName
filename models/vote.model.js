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
        choice: {
            type: [
                {
                    name: String,
                    voteCount: Number,
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