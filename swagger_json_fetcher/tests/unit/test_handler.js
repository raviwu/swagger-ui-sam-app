'use strict';

const app = require('../../app.js');
const chai = require('chai');

const expect = chai.expect;
var context;
var event = { pathParameters: { fileName: 'uber-sample.json' } }

const AWS = require('aws-sdk');
const sinon = require('sinon');
const jsonResponse = require('../fixtures/uber-sample.json')

const stub = sinon.stub(AWS.Service.prototype, 'makeRequest');

stub.withArgs('getObject', sinon.match.any, sinon.match.any)
    .returns({
        promise: () => {
            return { Body: jsonResponse }
        }
    });

describe('Tests fetchJson files', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = result.body;

        expect(response).to.be.eq(jsonResponse.toString());
    });
});
