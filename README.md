# sam-app for a swagger ui host on assigned S3 bucket

This is a sample app for a swagger ui interface that consumes a assigned `S3` bucket and `path` sources.

The fetcher will dymanically consume the resources in `S3`.

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)
* Preconfigure a S3 Bucket and prefix filepath
    * Initialize your own S3 bucket with a path.
    * Remember to update the default `bucketName` and `path` in the two `app.js` files.

## Setup process

### Installing dependencies

```bash
make install
```

### Local development

**Invoking function locally through local API Gateway**

```bash
make start
```

If the previous command ran successfully you should now be able to hit the following local endpoint to invoke your function `http://localhost:3000/doc`

**SAM CLI** is used to emulate both Lambda and API Gateway locally and uses our `template.yaml` to understand how to bootstrap this environment (runtime, where the source code is, etc.)

> **See [Serverless Application Model (SAM) HOWTO Guide](https://github.com/awslabs/serverless-application-model/blob/master/HOWTO.md) for more details in how to get started.**

## Testing

```bash
make unit-test
```

# Appendix

## AWS CLI commands

AWS CLI commands to package, deploy and describe outputs defined within the cloudformation stack:

```bash
sam package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket BUCKET_NAME

sam deploy \
    --template-file packaged.yaml \
    --stack-name STACK_NAME \
    --capabilities CAPABILITY_IAM

aws cloudformation describe-stacks \
    --stack-name STACK_NAME --query 'Stacks[].Outputs'
```

**NOTE**: Alternatively this could be part of package.json scripts section.

## Bringing to the next level

Here are a few ideas that you can use to get more acquainted as to how this overall process works:

* Create an additional API resource (e.g. /hello/{proxy+}) and return the name requested through this new path
* Update unit test to capture that
* Package & Deploy

Next, you can use the following resources to know more about beyond hello world samples and how others structure their Serverless applications:

* [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/)
