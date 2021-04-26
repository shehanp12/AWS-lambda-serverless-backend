const awsServerlessExpress = require("aws-serverless-express");
const app = require("src/index");
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const {v4 : uuidv4} = require('uuid');

// const server= awsServerlessExpress.createServer(app);

const postsTable = process.env.POSTS_TABLE;

// exports.handler = (event,context) => {
//     return awsServerlessExpress.proxy(server,event,context);
//
//
// }

const response = (statusCode,message) =>{
    return {
        statusCode:statusCode,
        body:JSON.stringify(message)
    };

}


module.exports.createPost = (event,context,callback) => {

    const reqBody = JSON.parse(event.body);

    if(!reqBody.title || reqBody.title.trim() === '' || !reqBody.body || reqBody.body.trim() === ''){
        return callback(null, response(400, {
                error: 'Post must have a title and body and they must not be empty'
            })

        );
    }

    const post = {
        id:uuidv4(),
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

