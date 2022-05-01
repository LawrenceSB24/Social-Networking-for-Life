// Thoughts GET, POST, PUT, and DELETE route
// const to import router express module

const router = require('express').Router();
// const for retrieving user thought modules
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);


// /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/reactionId').delete(removeReaction);

// **DISCLAIMER** These routes are rudimentary and will be updated based on
// user thought functionality.

// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b" 
// }

module.exports = router;