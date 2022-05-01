// Initialization file for user and thought routes

const router = require('express').Router();
const userRoute = require('./userRoute');
const thoughtRoute = require('./thoughtRoute');

// Use of routes outside of routes folder
router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

module.exports = router;