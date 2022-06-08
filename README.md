# Social-Networking-for-Life

This is an social network web application that uses Express.js, MongoDB, and the Mongoose ODM to create API data. This allows users to share their thoughts, react to their friends thoughts, and create a friends list.

## Table of Contents
* [User Story](#user-story)

* [Acceptance Criteria](#accecptance-criteria)

* [Installation](#installation)

* [Usage](#usage)

* [Demo](#demo)

* [Questions](#questions)

## User Story
```
AS A social media setup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Accecptance Criteria
```
GIVEN a social network api
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user's friend list
```

## Installation

To install this application, please listen to the following instructions:

1) You will need to clone this repo into your own project repo using your terminal
2) To install the NPM package, type `npm install` in your terminal
3) To acquire the Mongoose, Express, and (optional) Moment packages, simply type in `npm i (package name)` into your terminal

After following these procedures, you may now use the API for your own endevors

## Usage

Due to this application not containing a front-end portion, you will need to use Insomnia to test out the following:

1) GET, POST, PUT, DELETE for users 
2) GET, POST, PUT, DELETE for user thoughts
3) POST and DELETE for user friend lists
4) POST and DELETE for reactions to user thoughts

## Demo

This section will demostrate how the API can work for your introductory social networking needs.

Here is a snapshot of the Insomnia layout: 

Users GET query: [Users-Query](/assets/SNA%20Users.png)

Thoughts GET query: [Thoughts-Query](/assets/SNA%20Thoughts.png)

Video to API demo:

[Video 1](https://drive.google.com/file/d/19a-27mFUqZPIuquTdDISsOT1kZ0_iUFB/view);
[Video 2](https://drive.google.com/file/d/1m4wNGWhaik3NcOmPEP8CmkmNMSK5DhWU/view)


## Questions

If you have any further questions, then you can reach me on my GitHub page or email me directly:
* Github: https://github.com/LawrenceSB24/Social-Networking-for-Life
* Email: lawrs2022@github.com


### UPDATE: FULLY FUNCTIONAL! ####

Good god my timing is awful. Ok, so after doing more research I was able to get the Social Network API to run at full compacity.

