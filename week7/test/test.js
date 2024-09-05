const { expect } = require('chai');
const request = require('request');

const baseUrl = 'http://localhost:3000/api';

describe('Calculator API Tests', function() {
    // Test GET /addTwoNumber
    describe('GET /addTwoNumber', function() {
        it('returns statusCode 201 on successful addition', function(done) {
            const url = `${baseUrl}/addTwoNumber?n1=5&n2=3`;
            request(url, function(error, response, body) {
                const responseObj = JSON.parse(body);
                expect(response.statusCode).to.equal(201);
                expect(responseObj.data).to.equal(8); // 5 + 3 = 8
                done();
            });
        });

        it('handles missing value', function(done) {
            const url = `${baseUrl}/addTwoNumber?n1=&n2=3`; // Missing n2 value
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(400); // Expect 400 for server error
                done();
            });
        });

       

        it('returns correct content-type', function(done) {
            const url = `${baseUrl}/addTwoNumber?n1=5&n2=3`;
            request(url, function(error, response) {
                expect(response.headers['content-type']).to.include('application/json');
                done();
            });
        });
    });

    // Test GET /subTwoNumber
    describe('GET /subTwoNumber', function() {
        it('returns statusCode 201 on successful subtraction', function(done) {
            const url = `${baseUrl}/subTwoNumber?n1=10&n2=4`;
            request(url, function(error, response, body) {
                const responseObj = JSON.parse(body);
                expect(response.statusCode).to.equal(201);
                expect(responseObj.data).to.equal(6); // 10 - 4 = 6
                done();
            });
        });
    });

    // Test GET /mulTwoNumber
    describe('GET /mulTwoNumber', function() {
        it('returns statusCode 201 on successful multiplication', function(done) {
            const url = `${baseUrl}/mulTwoNumber?n1=7&n2=6`;
            request(url, function(error, response, body) {
                const responseObj = JSON.parse(body);
                expect(response.statusCode).to.equal(201);
                expect(responseObj.data).to.equal(42); // 7 * 6 = 42
                done();
            });
        });
    });

    // Test GET /calcData
    describe('GET /calcData', function() {
        it('returns statusCode 200 and all calculations', function(done) {
            const url = `${baseUrl}/calcData`;
            request(url, function(error, response, body) {
                const responseObj = JSON.parse(body);
                expect(response.statusCode).to.equal(200);
                expect(responseObj.data).to.be.an('array'); // Expect the data to be an array
                done();
            });
        });
    });

    // Test invalid URL
    describe('Invalid URL', function() {
        it('handles invalid URL', function(done) {
            const url = `${baseUrl}/nonexistent`;
            request(url, function(error, response) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });
});
