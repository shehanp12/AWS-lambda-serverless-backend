const express= require("express");
const router = express.Router({
    mergeParams: true
});

const createPost = require("controllers/posts");

router.get('/',createPost);


module.exports = {
    router,
};

