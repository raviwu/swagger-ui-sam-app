const bucketName = process.env.S3_BUCKET || 'test-swagger-ui-bucket';
const path = process.env.S3_PATH || 'api-docs';

const AWS = require('aws-sdk');

const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'us-east-2' });

exports.lambdaHandler = async (event, context) => {
    try {
        const s3Object = await s3.getObject({
            Bucket: bucketName,
            Key: `${path}/${event.pathParameters.fileName}`
        }).promise();

        response = {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: s3Object.Body.toString()
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
