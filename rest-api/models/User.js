const mongoose  = require('mongoose')
const bcrypt    = require('bcryptjs')

const UserSchema = new mongoose.Schema({
		username: { type: String, required: true, trim: true, unique: true, index: true },
		password: { type: String, required: true },
		email:    { type: String, required: true, trim: true, unique: true, index: true },
		firstName: { type: String, trim: true},
		lastName:  { type: String, trim: true},
		gender: { type: String, enum: ['Not Specified', 'Male', 'Female'], default: 'Not Specified' }
	},
	{ timestamps: true })


UserSchema.pre('save', function (next) {
	// do validations here?
	next()
})

// TODO: will this work????
UserSchema.statics.comparePassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash)
}

UserSchema.statics.findAll =  () => {
	return User.find({},
		{__v: 0}
	).lean().exec()
}

UserSchema.statics.findById = (id) => {
	return User.findOne({ _id: id},
		{ __v: 0 }
	).lean().exec()
}

UserSchema.statics.findByUsername = (username) => {
	return User.findOne({ username },
		{ __v: 0 }
	).lean().exec()
}

UserSchema.statics.findByEmail = (email) => {
	return User.findOne({ email },
		{ __v: 0 }
	).lean().exec()
}

UserSchema.statics.removeUser = (id) => {
	return User.remove({_id: id}).exec()
}


UserSchema.statics.updateUser = (user) => {
	return User.updateOne(
		{ _id: user._id },
		{ $set: user }
	).exec()
}

const User = mongoose.model('User', UserSchema)
module.exports = User