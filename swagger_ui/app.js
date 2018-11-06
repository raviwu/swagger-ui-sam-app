const ejs = require('ejs');
const templateString = require('fs').readFileSync('swaggerUi.ejs', 'utf-8');

const bucketName = process.env.S3_BUCKET || 'test-swagger-ui-bucket';
const path = process.env.S3_PATH || 'api-docs';

const AWS = require('aws-sdk');

const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-2'});

let html;
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        const s3BucketFiles = await s3.listObjects({
            Bucket: bucketName,
            Prefix: path
        }, function(err, data) {
            if (err) console.log(err, err.stack);
            }).promise();

        let swaggerSource = s3BucketFiles.Contents.filter(object => object.Size > 0).map(object => {
            let fileName = object.Key.split('/')[1];
            return { name: fileName, url: `/${event.requestContext.stage}/jsonFiles/${fileName}` };
        });

        html = ejs.render(templateString, {
            appName: 'YOUR_APP_NAME',
            swaggerSources: swaggerSource
        });

        response = {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/html',
            },
            body: html,
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
