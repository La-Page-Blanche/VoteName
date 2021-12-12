const router = require("express").Router();
const voteController = require("../controllers/vote.controller");

// user DB
router.get("/", voteController.getAllVotes);
router.get("/:id", voteController.voteInfo);

router.post('/', voteController.createVote);
router.patch('/prop/:id', voteController.addProp);
router.patch('/vote/:id', voteController.voteForProp);

router.put('/:id', voteController.updateVote);

module.exports = router;