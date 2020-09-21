const router = require('express').Router() ,
    Product =require('../models/product')

// POST request - create a new product
router.post('/products' , async(req , res) => {
    try {
        let product = new Product() ;
        product.title = req.body.title
        product.description = req.body.description
        product.photo = req.body.photo
        product.stockQuantity = req.body.stockQuantity
        product.owner =req.body.ownerID 
        product.category = req.body.categoryID ,
        product.price = req.body.price
        await product.save() ;
        res.json({
            status: true ,
            message: "Successfuly Saved!"
        }) ;
    } catch (error) {
        res.status(500).json({
            status: false ,
            message: error.message
        })
    }
})


// GET request - get all products

router.get("/products" , async(req , res) => {
    try {
        let products = await Product.find().populate("category owner").populate('reviews' , 'rating').exec() ;
        res.json({
            success : true ,
            products : products
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        })  
    }
})


// GET request - get a single product

router.get("/products/:id" , async(req , res) => {
    try {
        let product = await Product.findOne({ _id : req.params.id}).populate("category owner").populate('reviews' , 'rating').exec() ;
        res.json({
            success : true ,
            product : product
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        })  
    }
})


// PUT request - update a single product

router.put("/products/:id" , async(req , res) => {
    try {
        let product = await Product.findOneAndUpdate(
            { 
                _id : req.params.id
            } , 
            {
                $set: {
                    title: req.body.title ,
                    price : req.body.price ,
                    category : req.body.category ,
                    description : req.body.description ,
                    photo : req.body.photo ,
                    owner: req.body.ownerID ,
                    category : req.body.categoryID ,
                }
            } ,
            {
                upsert: true
            }
        ) ;
        res.json({
            success : true ,
            updatedProduct : product
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        })  
    }
})


// DELETE request - delete a single product

router.delete("/products/:id" , async (req , res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id : req.params.id})
        if (deletedProduct) {
            res.json({
                success : true ,
                message : "Product has been deleted succesfully!"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        }) 
    }
})

module.exports = router;