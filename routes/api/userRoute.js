// User GET, POST, PUT, and DELETE route
// BONUS: Delete thoughts with said user

const router = require('express').Router();

// Const for importing user action functions from controller
const {
    getUsers,
    getSoloUser,
    createUser,
    updateUser,
    deleteUser

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSoloUser).delete(deleteUser);

// 