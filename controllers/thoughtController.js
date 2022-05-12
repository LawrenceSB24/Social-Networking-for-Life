// Controller file for user thoughts and reactions

// Exporting modules for User and Thoughts
const {User, Thoughts} = require('../models');

const thoughtControl = {

    // Retrieves all user thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Retrieves a single thought from the user
    getSingleThought(req, res) {
        Thoughts.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .sort({createdAt: -1})
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'No thought found in the collective'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err));
    },

    // Creates a thought
    createThought(req, res) {
        Thoughts.create(req.body)
        .then((thought) => {
            User.findOneAndUpdate(
                {_id: req.params.userId},
                {$push: {thoughts: req.params.thoughtId}},
                {runValidators: true, new: true}
            )
            res.json(thought);
        })
        .catch((err) =>  res.status(500).json(err));
    },

    // Deletes a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) => {
                !thought
                    ? res.status(404).json({message: 'No thought found in the collective'})
                    : User.deleteMany({_id: {$in: thought.users}})
            })
            .then(() => res.json({message: 'User AND their thoughts have been surgucally removed from the collective'}))
            .catch((err) => res.status(500).json(err));
    },

    // Updates a thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'No thought found in the collective'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },

    // Add a reaction to thought
    addReaction(req, res) {
        console.log('Reaction added to the thought collective');
        console.log(req.body);
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Reaction has been rejected by the collective'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err));
    },

    // Remove a reaction to thought
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: req.params.reactionId}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Action has been rejected by the collective'})
                : res.json(thought)
        })
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtControl;

// **DISCLAIMER**
// I am not postive that this will work as this is a re-work of the user controller
// Any changes will be noted