const Emp = require('./../models/empModel')
const catchAsync = require('./../utilities/catchAsync')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const getToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN * 60 * 60 * 1000
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const emp = Emp.create(req.body)
    const token = getToken(emp._id)
    res.status(200).json({
        status: 'succces',
        token
    })
})


exports.login = catchAsync(async (req, res, next) => {
    const email = req.body.email
    const emp = await Emp.findOne({ email })
    if (!email) {
        next(new Error("Not a valid email or password"))
    }
    const isCorrect = await emp.isPassowrdCorrect(req.body.password, emp.password)
    console.log(isCorrect)
    if (!isCorrect) {
        next(new Error("Not a valid email or password"))
    }
    const token = getToken(emp._id)
    res.cookie('jwt', token)
    res.status(200).json({
        status: 'succces',
        token
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
        return next(new Error('No token. Please login again'))
    }
    const token = authorizationHeader.split(' ')[1]
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)
    const user = await Emp.findById(decoded._id)
    if (!user) {
        return next(new Error('Invalid token. Please login again'))
    }
    req.user = user
    next()
})