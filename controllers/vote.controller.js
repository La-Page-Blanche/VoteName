const VoteModel = require("../models/vote.model");
const ObjectID = require("mongoose").Types.ObjectId;
const axios = require("axios");

module.exports.getAllVotes = async (req, res) => {
  const votes = await VoteModel.find().sort({createdAt: -1});
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
      endDate: req.body.endDate,
      choice: {
        name: req.body.choice
      },
    });

    const vote = await newVote.save();
    return res.status(201).json(vote);
  } catch (err) {
    res.status(200).send(err)
  }
};

module.exports.addProp = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await VoteModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { choice: { name: req.body.prop, voteCount: 1 } } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    // res.status(200).send(err)
  }
};

module.exports.voteForProp = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    return await VoteModel.findById(req.params.id, async (err, docs) => {
      const theComment = await docs.choice.find((c) =>
        c._id.equals(req.body.voteId)
      );

      if (!theComment) return res.status(404).send("VoteProp not found");
      theComment.voteCount = theComment.voteCount + 1;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    // res.status(200).send(err)
  }
};

module.exports.updateVote = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    if (req.body.end) {
      try {
        await VoteModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              end: req.body.end,
            },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
          (err, docs) => {
            if (!err) return res.send(docs);
            if (err) return res.status(500).send({ message: err });
          }
        );
      } catch (err) {
        // return res.status(500).json({ message: err });
      }
    }
};