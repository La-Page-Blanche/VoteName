const router = require("express").Router();
const voteController = require("../controllers/vote.controller");

// user DB
router.get("/", voteController.getAllVotes);
router.get("/:id", voteController.voteInfo);

router.post('/', voteController.createVote);

module.exports = router;