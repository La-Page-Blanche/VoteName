const VoteModel = require("../models/vote.model");
const ObjectID = require("mongoose").Types.ObjectId;
const axios = require("axios");

module.exports.getAllVotes = async (req, res) => {
  const votes = await VoteModel.find();
  res.status(200).json(votes);
};

module.exports.voteInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  VoteModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  });
};

module.exports.createVote = async (req, res) => {

  try {
    const newVote = new VoteModel({
      voteName: req.body.name,
      desc: req.body.desc,
      choice: {
        name: req.body.choice
      },
    });

    const vote = await newVote.save();
    return res.status(201).json(vote);
  } catch (err) {
    res.status(200).send("err")
  }
};