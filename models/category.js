const mongoose   = require('mongoose') ,
        Schema   = mongoose.Schema ;



const CategorySchema = new Schema({
    type: { type: String , unique: true , required: true } ,
    photo : String ,
})

module.exports = mongoose.model("Category" , CategorySchema);