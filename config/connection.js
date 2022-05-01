// Connection file to MongoDB database

const {connect, connection} = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || 'mongodb://localhost:27017//usersDB';

connect(connectionString, {
    newUserParser: true,
    useUnifiedTopology: true
});

module.exports = connection;