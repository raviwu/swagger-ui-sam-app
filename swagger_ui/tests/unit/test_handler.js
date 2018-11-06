'use strict';

const app = require('../../app.js');
const chai = require('chai');

const expect = chai.expect;
var context;
var event = { requestContext: { stage: 'Test' } };

const AWS = require('aws-sdk');
const sinon = require('sinon');
const jsonResponse = require('../fixtures/ListObjectsResponse.json')

const stub = sinon.stub(AWS.Service.prototype, 'makeRequest');

stub.withArgs('listObjects', sinon.match.any, sinon.match.any)
    .returns({ promise: () => jsonResponse });

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = result.body;

        expect(response).to.be.contains('uber-sample.json');
    });
});
