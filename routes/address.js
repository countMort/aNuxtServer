const router    = require('express').Router() ,
    Address     = require('../models/address'),
    verifyToken = require('../middlewares/verify-token'),
    User        = require('../models/user')

router.post('/addresses' , verifyToken , async (req , res) => {
    try {
        let address = new Address() ;
        address.user = req.decoded._id
        address.city = req.body.city
        address.fullName = req.body.fullName
        address.streetAddress = req.body.streetAddress
        address.state = req.body.state
        address.zipCode = req.body.zipCode
        address.phoneNumber = req.body.phoneNumber
        address.deliverInstructions = req.body.deliverInstructions
        await address.save()
        res.json({
            success : true ,
            message : "آدرس با موفقیت اضافه شد"
        })
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
})

router.get('/addresses' , verifyToken , async (req , res) =>{
    try {
        let addresses = await Address.find({user : req.decoded._id})
        res.json({
            success : true,
            addresses : addresses
        })
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
})

router.get('/addresses/:id' , verifyToken , async (req , res) =>{
    try {
        let address = await Address.findOne({user : req.decoded._id , _id : req.params.id})
        res.json({
            success : true,
            address : address
        })
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
})

// updating an address
router.put('/addresses/:id' , verifyToken , async (req , res) => {
    try {
        let address = await Address.findOne({user : req.decoded._id , _id : req.params.id }) ;
        if (address) {
            if(req.body.city) address.city = req.body.city
            if(req.body.fullName) address.fullName = req.body.fullName
            if(req.body.streetAddress) address.streetAddress = req.body.streetAddress
            if(req.body.state) address.state = req.body.state
            if(req.body.zipCode) address.zipCode = req.body.zipCode
            if(req.body.phoneNumber) address.phoneNumber = req.body.phoneNumber
            if(req.body.deliverInstructions) address.deliverInstructions = req.body.deliverInstructions
        }
        await address.save()
        res.json({
            success : true ,
            message : "آدرس با موفقیت به روز شد"
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        }) 
    }
})

router.delete('/addresses/:id' , verifyToken , async (req , res) => {
    try {
        let deletedAddress = await Address.deleteOne({user : req.decoded._id , _id : req.params.id})
        if (deletedAddress) {
            res.json({
                success : true ,
                message : "آدرس با موفقیت حذف شد"
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
})

// changing the default address
router.put('/addresses/set/default' , verifyToken , async (req , res) => {
    try {
        const doc = await User.findOneAndUpdate({_id : req.decoded._id} , {$set : { address : req.body.id }}) ;
        if(doc) {
            res.json({
                success : true ,
                message : "آدرس با موفقیت به عنوان آدرس پیش فرض لحاظ شد"
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
})

module.exports = router;