const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const empSchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        required: [true, "Must provide name for an employee"]
    },
    email: {
        type: String,
        required: [true, "Must provide email"]
    },
    active: {
        type: Boolean
    },
    password: {
        type: String,
        min: 8,
        required: [true, "Must provide password"]
    }
})


empSchema.methods.isPassowrdCorrect = (candidatePassword, userPassword) => {
    return bcrypt.compare(candidatePassword, userPassword)
}

empSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

const Emp = mongoose.model('Emp', empSchema)

module.exports = Emp