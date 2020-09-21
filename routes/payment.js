const moment    = require("jalali-moment"),
    router      = require("express").Router(),
    verifyToken = require('../middlewares/verify-token'),
    Order       = require('../models/order'),
    SHIPMENT    = {
        normal : {
            price : 2 ,
            days : 1
        } ,
        fast : {
            price : 6 ,
            days : 0
        }
    }

function shipmentPrice(shipmentOption) {
    let estimated = moment().add(shipmentOption.days , "d").locale('fa').format('dddd Do MMMM') ,
    createdTime = moment().locale('fa').format('dddd Do MMMM')
    return {estimated , price : shipmentOption.price , createdTime}
}

router.post("/shipment" , (req , res) =>{
    let shipment ;
    if(req.body.shipment === "normal") {
        shipment = shipmentPrice(SHIPMENT.normal)
    } else {
        shipment = shipmentPrice(SHIPMENT.fast)
    }

    res.json({
        success : true ,
        shipment : shipment
    })
})

router.post("/payment" ,verifyToken, async (req,res)=> {
    try {
        let order = new Order()
        let cart = req.body.cart
        cart.map(product => {
            order.products.push({
                productID: product._id ,
                title: product.title ,
                quantity: parseInt(product.quantity) ,
                price: product.price
            })
        })

        order.owner = req.decoded._id ;
        order.estimatedDelivery = req.body.estimatedDelivery
        order.totalPrice = req.body.totalPrice
        order.createdTime = req.body.createdTime
        order.deliverTo = req.body.deliverTo
        await order.save()

        res.json({
            success : true ,
            message : "سفارش شما با موفقیت ثبت شد."
        })
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
})
router.get("/orders" , verifyToken , async (req , res) => {
    try {
        let orders = await Order.find({ owner : req.decoded._id}).populate("deliverTo").exec()
        res.json({
            success : true ,
            orders
        })
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
})

module.exports = router ;