const mongoose = require('mongoose');
const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
    },
    image:{
        type:String,
    },
    bestSeller:{
        type:Boolean,
        default:false,
    },
    SalePercent:{
        type:Number,
        default:0,
    },
    options:[{type:String}],
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories"
    },
    properties:[{
        value: [{type:String}],
        price: {type:Number}
    }]
}, { timestamps: true });
module.exports = mongoose.model('Products', ProductsSchema);