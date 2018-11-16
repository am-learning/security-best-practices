//connect to MongoDB database
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sec-best-practices'

mongoose.Promise = global.Promise
mongoose.connect(mongoUrl,{useNewUrlParser: true})
mongoose.connection.on('error', () => {
	console.log('\tMongoDB Connection Error. Please make sure that MongoDB is running.')
	process.exit(1)
})
mongoose.connection.on('connected', function(){
    console.log(`\tMongoDB: Connected to ${mongoose.connection.name}`)
    mongoose.set('useCreateIndex', true)
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});

module.exports = mongoose
// end of MongoDB connection



