const awsServerlessExpress = require("aws-serverless-express");
const AWS = require('aws-sdk');
const app = require("src/index");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');


const server= awsServerlessExpress.createServer(app);

exports.handler = (event,context) => {
    return awsServerlessExpress.proxy(server,event,context);


}
