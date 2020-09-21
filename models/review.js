const mongoose   = require('mongoose') ,
        Schema   = mongoose.Schema ;



const ReviewSchema = new Schema({
    headline : String ,
    body : String ,
    rating : Number ,
    photo : String ,
    productID : { type: Schema.Types.ObjectId , ref: "Product"},
    user : {type : Schema.Types.ObjectId , ref: "User"}
})

module.exports = mongoose.model("Review" , ReviewSchema);