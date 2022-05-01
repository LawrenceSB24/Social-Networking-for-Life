// Seed file for seeding database with placeholder data

// const connection = require('../config/connection');
// const {Thoughts, User} = require('../models');
// const {getRandomUser, getRandomThought} = require('./data');

// connection.on('open', async () => {
//     console.log('Connection to hive established');
//     // Dropping existing users
//     await User.deleteMany({});

//     // Dropping existing thoughts
//     await Thoughts.deleteMany({});

//     // Empty array for users
//     const users = [];

//     // Loop 30 times -- add users to users array
//     for (let i = 0; i < 30; i++) {
//         const thoughts = getRandomThought(30);

//         const user = getRandomUser();
//         const email = `${emails}`

//         user.push({
//             user,
//             email,
//             thoughts
//         });
//     }

//     // Adds users to the collection and awaits results
//     await User.collection.insertMany(users);

//     // Add thoughts to the collection and await the results
//     await Thoughts.collection.insertOne({
//         thoughts: 'Blank thoughts are harmful to the collective hive',
//         user: [...users]
//     });

//     // Log out seed data to indicate what should appear in database
//     console.table(users);
//     console.info('Seeding complete! 🌱');
//     process.exit(0);
// })