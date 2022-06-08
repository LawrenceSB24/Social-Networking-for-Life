// Controller file for user information

// **UPDATE**
// Functionality for user and friend actions reviewed and corrected
// Fully operational!


// const {ObjectId} = require('mongoose').Types;
const {User, Thoughts} = require('../models');

const userControl = {

    // Get all users
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({createdAt: -1})
        .then(async (users) => {
            const userObj = {users};
            return res.json(userObj);
        })
        // Added error handling
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    // Get a single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .populate("thoughts")
            .populate("friends")
            .select('-__v')
            .then((user) => {
                !user
                    ? res.status(404).json({message: 'No user discovered with this id'})
                    : res.json(user)
            })
            // Added error handling
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // Creates a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            // Added error handling
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // Updates an existing user given the user's id
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
            )
            // Fixed from .then((user) => req.json(user))
            .then((user) => res.json(user))
            // Added error handling
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // Deletes a user and removes them from the database
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) => {
                !user
                    ? res.status(404).json({message: 'No user discovered with this id'})
                    : Thoughts.deleteMany({_id: user.thoughts})
            })

            .then((thoughts) => {
                !thoughts
                    ? res.status(404).json({message: 'User removed but, their thoughts are still part of the collective'})
                    : res.json({message: 'User has been set free'})
            })

            // Added error handling
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // User can add a friend to their friend list
    addFriend(req, res) {
        console.log('Friend added to your list');
        console.log(req.body);
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((friend) => {
            !friend
                ? res.status(404).json({message: 'No friend discovered with this id'})
                : res.json(friend)
        })
        // Added error handling
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    // Removes a friend from a user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) => {
            !user
                ? res.status(404).json({message: 'No friend discovered with this id'})
                : res.json(user)
        })
        // Added error handling
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    }
};

module.exports = userControl;

