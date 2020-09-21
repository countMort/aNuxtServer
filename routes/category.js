const router = require('express').Router() ,
    Category =require('../models/category')


// POST request

router.post('/categories' , async (req , res) => {
    try {
        const category = new Category();
        category.type = req.body.type;
        category.photo= req.body.photo 

        await category.save() ;
        res.json({
            success: true ,
            message: "Succesully Created a new Category"
        })
    } catch (err) {
    res.status(500).json({
        success: false ,
        message: err.message
    })        
    }
})

// GET request

router.get("/categories" , async(req , res) => {
    try {
        let categories = await Category.find() ;
        res.json({
            success : true ,
            categories : categories
        })
    } catch (error) {
        res.status(500).json({
            success: false ,
            message: error.message
        })  
    }
})

module.exports = router;