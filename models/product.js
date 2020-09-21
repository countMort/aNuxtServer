const mongoose   = require('mongoose') ,
        Schema   = mongoose.Schema ;



const ProductSchema = new Schema(
    {
        category: { type: Schema.Types.ObjectId , ref: "Category"} ,
        owner: { type: Schema.Types.ObjectId , ref: "Owner"} ,
        title: String ,
        description: String ,
        photo: String ,
        price: Number ,
        stockQuantity: Number ,
        reviews: [{ type: Schema.Types.ObjectId , ref: "Review"}]  ,
    } ,
    {
        toObject : {virtuals : true} ,
        toJSON : {virtuals : true}
    })

ProductSchema.virtual('averageRating').get(function() {
    if(this.reviews.length > 0) {
        let sum = this.reviews.reduce((total , review) => {
            return total + review.rating
        },0)
        const avg = sum / this.reviews.length
        return avg.toFixed(1)
    }
    return 0
})

ProductSchema.virtual('aboveMiddle').get(function() {
    if(this.reviews.length > 0) {
        let counter = 0
        this.reviews.map(review => review.rating >= 3.5 ? counter ++ : '')
        let percentage = Math.round(counter/this.reviews.length * 100)
        return percentage
    }
    return null
})

module.exports = mongoose.model("Product" , ProductSchema);