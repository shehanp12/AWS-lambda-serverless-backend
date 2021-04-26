const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const postsTable = process.env.POSTS_TABLE;

const response = (statusCode,message) =>{
    return {
        statusCode:statusCode,
        body:JSON.stringify(message)
    };

}

//create Post
module.exports.createPost = (event,context,callback) => {

    const reqBody = JSON.parse(event.body);

    if(!reqBody.title || reqBody.title.trim() === '' || !reqBody.body || reqBody.body.trim() === ''){
        return callback(null, response(400, {
                error: 'Post must have a title and body and they must not be empty'
            })

        );
    }

    const post = {
        id:uuid(),
        createdAt:new Date().toISOString(),
        title:reqBody.title,
        body:reqBody.body
    };

    return db.put({
        TableName:postsTable,
        Item:post,

    }).promise().then(() => {
        callback(null,response(201,post));

    }).catch((err) => response(null,response(err.statusCode,err)));


};


