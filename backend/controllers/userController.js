const ErrorHandler = require('../utils/errorhandler')

const catchAsyncErrors = require('../middleware/catchAsyncErrors')

const User = require('../model/userModel')
const sendToken = require('../utils/jwtToken')

// Register a User

exports.registerUaser = catchAsyncErrors(async (req, res, next) => {
  const {name, email, password} = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'this is a simple id',
      url: 'profilepicUrl',
    },
  })

  sendToken(user, 201, res)
})

// Login User

exports.userLogin = catchAsyncErrors( async (req, res, next)=>{

  const {email, password} = req.body
  // checking if user has both password & email
  if(!email || !password){
    return next(new ErrorHandler('Please enter Email & Password',400))
  }
  const user = await User.findOne({email}).select('+password')
  if(!user){
    return next(new ErrorHandler('Invalid Email & Password',401))
  }

  const isPasswordMatched = await user.camparePassword(password)

  if(!isPasswordMatched){
    return next(new ErrorHandler('Invalid Email & Password',401))
  }
  
  sendToken(user, 200, res)
  
})

// User Logout function

exports.logout = catchAsyncErrors(async (req,res, next)=>{

  res.cookie("token",null, {
    expires: new Date(Date.now()),
    httpOnly:true
  })

  res.status(200).json({
    success:true,
    message:'Logout Successfully'
  })
})
