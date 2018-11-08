//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// dev dependencies
let chai = require('chai')              // cheatsheet: https://gist.github.com/yoavniran/1e3b0162e1545055429e
let chaiHttp = require('chai-http')     // alternative is 'supertest'
let should = chai.should()
let server
chai.use(chaiHttp)

// help: https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
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
    // and insert a new movie (which will then help with the 'get' request) 
    describe('endpoint /POST movies', ()=> {
        // behavior: it should return a status of 201 (new resource successfully created)
        // behavior: it should insert one new movie record
            // the count before insert would be 0
            // the count after insert should be 1
        // behavior: it should return a json object
        // behavior: the json object should have a property message 
        // behavior: the value of message should be "Successfully inserted new Movie"  
        it('should insert a new movie', (done)=>{
            let newMovie = {
                id: 1,
                title: "The Lord of the Rings: The Fellowship of the Ring",
                director: "Peter Jackson",
                year: 2001
            }
            chai.request(server)
                .post('/api/movies')
                .send(newMovie)
                .end((err, res)=> {
                    if (err) return done(err)

                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.have.own.property('message')
                    res.body.message.should.equal('Successfully inserted new Movie')
                    done()
                })
        })
    })

    describe('endpoint /GET movies', ()=> {
        // behavior: it should return a status of 200
        // behavior: it should return an array of json objects
        // behavior: it should return all movies 
            // Determine the count:
            // since we started with an empty storage (beforeEach) => count = 0
            // then inserted one movie in the test for '/POST movie' endpoint => count = 1
            // therefore, length of the return array will be 1        
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


    describe('endpoint /GET/:id movie by id', ()=> {
        // behavior: it should return a status of 200
        // behavior: it should return a json object
        // behavior: the json object should have keys 'id', 'title', 'director', and 'year'
        it('should return a movie given an id (case: id exists)', (done)=> {
            chai.request(server)
                .get('/api/movies/1')       // movie id  = 1
                .end((err, res) => {
                    if (err) return done(err)

                    //console.log(res.body)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.own.property('id')
                    res.body.should.have.own.property('title')
                    res.body.should.have.own.property('director')
                    res.body.should.have.own.property('year')

                    done()
                })
        })

        // behavior: it should return a status of 200
        // behavior: it should return a json object 
        // behavior: the json object should have a property message
        // behavior: value of message should be 'Movie with given id not found'        
        it('should return a message given an id (case: id does not exist)', (done)=> {
            chai.request(server)
                .get('/api/movies/2')       // movie id  = 2 doesnt exist
                .end((err, res) => {
                    if (err) return done(err)

                    //console.log(res.body)
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.own.property('message')
                    res.body.message.should.equal('Movie with given id not found')
                    
                    done()
                })
        })

    })
    


})