// Placeholder data for testing and auto-database generation

const users = [
    'beyton24',
    'johnStillman28374',
    'user92034789',
    'chickenMonster2020'
];

const emails = [
    'lernantino@gmail.com',
    'lernantino293847@gmail.com',
    'lernantinoArt@gmail.com',
    'lernantinoShift@gmail.com'
];

const addThoughts = [
    'Loves the Matrix film series',
    'Biological scientist for the CDC',
    'Hello Canada!',
    'Lover of onions and horror!'
];

// Gets a random item given the array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random user
const getRandomUser = () => {
    `${getRandomArrItem(users)}`,
    `${getRandomArrItem(emails)}`
};

// Function to generate random thoughts that can be added to user object
const getRandomThought = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(addThoughts),
            users: getRandomArrItem(users),
            userId: getRandomArrItem(userId)
        });
    }
    return results;
}

// Exports function for use in seed .js
module.exports = {getRandomUser, getRandomThought};
// Example info for users
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

// Example data for 