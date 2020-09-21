const   router  = require('express').Router() ,
        User    = require('../models/user') ,
        jwt     = require('jsonwebtoken') ,
        verifyToken = require('../middlewares/verify-token')


// Signup route
router.post('/auth/signup' , async (req , res) => {
    if(!req.body.email || !req.body.password) {
        res.json({
            success : false ,
            message : "لطفا ایمیل و پسوورد را وارد نمایید"
        })
    } else {
        try {
            let newUser = new User() ;
            newUser.name = req.body.name ;
            newUser.email = req.body.email ;
            newUser.password = req.body.password ;
            await newUser.save() ;
            let token = jwt.sign(newUser.toJSON() , process.env.SECRET , {
                expiresIn: 604800 // 1 week
            })

            res.json({
                success : true ,
                token : token ,
                user : newUser,
                message : "Succesfully created a new user"
            })
        } catch (error) {
            res.status(500).json({
                success: false ,
                message: error.message
            })
        }
    }
})

// Profile route
router.get("/auth/user", verifyToken , async(req , res) => {
    try {
        let foundUser = await User.findOne({_id: req.decoded._id} ).populate('address').exec() ;
        if (foundUser) {
            res.json({
                success : true ,
                user : foundUser
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        })
    }
})

// Profile update route
router.put('/auth/user' , verifyToken , async(req , res)=> {
    try {
        let foundUser = await User.findOne({_id : req.decoded._id})
        if (foundUser) {
            if (req.body.name) foundUser.name = req.body.name
            if (req.body.email) foundUser.email = req.body.email
            if (req.body.password) foundUser.password = req.body.password
        }
        await foundUser.save() ;
        res.json({
            success : true ,
            message : "با موفقیت به روز شد"
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message 
        })
    }
})

// Login route
router.post("/auth/login" ,async (req , res) => {
    try {
        let foundUser = await User.findOne({email : req.body.email})
        if(!foundUser) {
            res.status(404).json({
                success : false ,
                message : "ورود انجام نشد ، کاربرد وجود ندارد!"
            })
        } else {
            if (foundUser.comparePassword(req.body.password)) {
                let token = jwt.sign(foundUser.toJSON() , process.env.SECRET , {
                    expiresIn : 604800 // 1 week
                }) 
                res.json({
                    success : true ,
                    token : token ,
                    message : "خوش آمدید"
                })
            } else {
                res.status(403).json({
                    success : false ,
                    message : "ورود انجام نشد ، رمز اشتباه!"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        })
    }
})

module.exports = router ;