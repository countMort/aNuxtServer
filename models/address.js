const mongoose   = require('mongoose') ,
        Schema   = mongoose.Schema ;



const AddressSchema = new Schema({
    user : {type : Schema.Types.ObjectId , ref : "User"} ,
    city : String ,
    fullName : String ,
    streetAddress : String ,
    state : String ,
    zipCode : String ,
    phoneNumber : Number ,
    deliverInstructions : String ,
})

module.exports = mongoose.model("Address" , AddressSchema);