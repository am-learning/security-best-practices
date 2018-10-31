//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//let mongoose = require("mongoose")
//let Movie = require('../models/movie')

//Require the dev-dependencies
let chai = require('chai')              // cheatsheet: https://gist.github.com/yoavniran/1e3b0162e1545055429e
let chaiHttp = require('chai-http')    
let request = require('supertest')
let should = chai.should()
let server
chai.use(chaiHttp)

// Describe tests for Movies API
describe('Testing Movies API', () => {
    // beforeEach Hook
    beforeEach( done =>{
        server = require('../server')
        // clean up the storage (database or json file)
        // call done() correctly
        done()
    })

    afterEach( done =>{
        //server.close()
        done()
    })

    after( done =>{
        console.log("\n\n*** Well Done writing your Tests!")
        // close mongoose 
        // mongoose.connection.close()
        done()
    })

    // describe the tests for each endpoint
    // Remember: its a test-first BDD approach I am implementing
    // I dont know what my API is supposed to do
        // I will be identifying a behavior and 
        // writing a test for it first 
        // before I implement that behavior


    // since there is no data, I will first test the 'post' endpoint 
    // and insert a new movie 
    describe('endpoint /POST movies', () =>{
        // behavior: it should find the endpoint (status 202)
        // behavior: it should insert one new movie record
            // the count before insert should be 0
            // the count after insert should be 1
        // behavior: it should return a message "Successfully inserted new Movie"  
        it('should insert a new movie', (done)=>{
            let newMovie = {
                title: "The Lord of the Rings",
                director: "J.R.R. Tolkien",
                producer: "",
                year: 2005
            }
            chai.request(server)
                .post('/api/movies')
                .send(newMovie)
                .end((err, res)=> {
                    if (err) return done(err)

                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.message.should.equal('Successfully inserted new Movie')
                    done()
                })
        })
    })

    describe('endpoint /GET movies', ()=>{
        // behavior: it should return all movies 
            // how to check the counts?
            // since we started with an empty storage (beforeEach) => count = 0
            // then inserted one movie in the test for '/POST movie' endpoint => count = 1
        // behavior: it should return a array of json objects
        // behavior: it should return a status of 200
        it('should return all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .end((err, res) => {
                    if (err) return done(err)

                    //console.log(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(1)

                    done();
            });
        })
    }) 


})