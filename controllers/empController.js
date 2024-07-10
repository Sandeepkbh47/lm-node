const Emp = require('./../models/empModel')
const catchAsync = require('./../utilities/catchAsync')
const redisClient = require('./../redis-server')

exports.getEmp = catchAsync(async (req, res, next) => {
    try {
        let emp; //= await redisClient.get('getEmp')
        if (true) {
            emp = await Emp.find({})
            await redisClient.set('getEmp', JSON.stringify(emp), {
                EX: 10,
                NX: true
            })
        } else {
            emp = JSON.parse(emp)
        }
        res.status(200).json({
            status: 'success',
            data: { emp }
        })
    } catch (err) {
        console.log(error)
        // return next(err)
    }
})

exports.createEmp = catchAsync(async (req, res, next) => {
    emp = await Emp.create(req.body)

    res.status(200).json({
        status: 'success',
        data: { emp }
    })
})
