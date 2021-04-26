const express= require("express");
const router = express.Router({
    mergeParams: true
});

const {createPost} = require("../handler");




router.get('/', (req, res) => {
    res.status(200).json({});
});







module.exports = {
    router,
};

