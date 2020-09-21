const mongoose  = require('mongoose'),
    Schema      = mongoose.Schema

const OrderSchema = new Schema({
    owner : {type: Schema.Types.ObjectId , ref: "User"},
    products: [
        {
            productID: {type: Schema.Types.ObjectId , ref:"Product"} ,
            quantity: Number ,
            price : Number ,
            title : String
        }
    ] ,
    estimatedDelivery : String ,
    totalPrice : Number ,
    createdTime : String ,
    deliverTo : {type : Schema.Types.ObjectId , ref: "Address"}
})

module.exports= mongoose.model("Order" , OrderSchema)
