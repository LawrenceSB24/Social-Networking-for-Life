// User GET, POST, PUT, and DELETE route
// BONUS: Delete thoughts with said user

const router = require('express').Router();

// const for retrieving modules for user info
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// **DISCLAIMER** These routes are rudimentary and will be updated based on
// User functionality.

// example data
// {
//  "username": "lernantino",
//  "email": "lernantino@gmail.com"
// }

module.exports = router;