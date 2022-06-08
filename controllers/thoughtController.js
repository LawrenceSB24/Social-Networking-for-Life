// Controller file for user thoughts and reactions

// **DISCLAIMER**
// I am not postive that this will work as this is a re-work of the user controller
// Any changes will be noted

// **UPDATE**
// Coming back after a few weeks, changes have been made to improve functionality of thoughtController
// Actions for thoughts and reactions fully functioning

// Exporting modules for User and Thoughts
const {User, Thoughts} = require('../models');

const thoughtControl = {

    // Retrieves all user thoughts
    getThoughts(req, res) {
        // Added empty object for Thoughts.find
        Thoughts.find({})
            // Added .select and .sort methods for retrieving all thoughts from retrieving single thoughts
            .select('-__v')
            .sort({createdAt: -1})
            .then((thoughts) => res.json(thoughts))
            // Added error handling
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
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
        // Added error handling
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },

    // Creates a thought
    createThought(req, res) {
        Thoughts.create(req.body)
        .then((thought) => {
            User.findOneAndUpdate(
                {_id: req.params.userId},
                // Fixed from {$push: {thoughts: req.params.thoughtId}},
                {$push: {thoughts: thought._id}},
                {runValidators: true, new: true}
            )
            res.json(thought);
        })
        // Added error handling
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },

    // Deletes a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) => {
                // Removed conditional statement to an if statement
                if (!thought) {
                    return res.status(404).json({message: 'No thought found in the collective'});
                }

                // !thought
                //     ? res.status(404).json({message: 'No thought found in the collective'})
                //     : User.deleteMany({_id: {$in: thought.users}})
            })
            .then(() => res.json({message: 'User AND their thoughts have been surgucally removed from the collective'}))
            // Added error handling
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
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
        // Added error handling
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },

    // Add a reaction to thought
    addReaction(req, res) {
        console.log('Reaction added to the thought collective');
        console.log(req.body);
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            // Originally {$addToSet: {reactions: req.body}}
            {$push: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Reaction has been rejected by the collective'})
                : res.json(thought)
        })
        // Added error handling
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },

    // Remove a reaction to thought
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            // Fixed from {$pull: {reactions: req.params.reactionId}},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            // Same reasoning as deleting thoughts
            if (!thought) {
                return res.status(404).json({message: 'Action has been rejected by the collective'});
            }
            res.json(thought);

            // !thought
            //     ? res.status(404).json({message: 'Action has been rejected by the collective'})
            //     : res.json(thought)

        })
        // Added error handling
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    }
};

module.exports = thoughtControl;