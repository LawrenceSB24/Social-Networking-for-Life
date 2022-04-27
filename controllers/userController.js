// Controller file for user information
const {ObjectId} = require('mongoose').Types;
const {User, Thoughts} = require('../models');

// Aggregate function for retrieving number of users overall
const userCount = async () => {
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);
};

// Aggregate function for getting thoughts from user
const thought = async (userId) => {
    User.aggregate([
        {$match: {_id: ObjectId(userId)} },
        {$unwind: '$thoughts'},
        {$group: {
            _id: ObjectId(userId),
            userThought: {$push: '$thoughts.thoughtText'}
        }}
    ])
};

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    userCount: await userCount()
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.err(err);
                return res.status(500).json('Users not found');
            });
    },

    // Get a single user (Only sigle user functionality for now)
    getSoloUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then(async (user) => {
                !user
                    ? res.status(404).json({message: 'No user with this ID found'})
                    : res.json({user})
            })
            .catch((err) => {
                console.err(err);
                return res.status(500).json('Users not found');
            });
    },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    // Delete a user (adding thought deletion later)
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => {
            !user
                ? res.status(404).json({message: 'No user with this ID found'})
                : Thoughts.findOneAndUpdate(
                    {users: req.params.userId},
                    {$pull: {users: req.params.userId}},
                    {new: true}
                )
        })
        .then((thoughts) => 
            !thoughts
                ? res.status(404).json({message: 'User removed, but thought remains'})
                : res.json({message: 'User successfully deleted'})   
        )
        .catch((err) => {
            console.err(err);
            return res.status(500).json(err);
        });
    },

    // Update a user by their id
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId})
        .then((user) => {
            !user
                ? res.status(404).json({message: 'User with this ID not found'})
                : res.json({message: `${user} has been updated!`})
        })
        .catch((err) => {
            console.err(err);
            return res.status(500).json(err);
        });
    }
};

// DISCLAIMER: Im not quite sure if this is the correct format as code is
// based on mini-project for student API. Theory is sound but syntax and
// functionality potentially incorrect.