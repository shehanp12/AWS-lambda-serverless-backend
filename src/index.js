const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    router: userRoutes,
} = require('../routes/user');

const {
    router: postRoutes
} = require("../routes/posts")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/posts',postRoutes);

module.exports = app;
