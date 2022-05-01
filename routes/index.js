// Initialize file for api routes

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) = res.send('Wrong path in the collective. Turn back now!'));

module.exports = router;