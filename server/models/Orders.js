const mongoose = require('mongoose');
const OrdersSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
    },
    images:[{
        image:{
            type:String,
        },
        status:{
            type:String,
        }
    }],
    selectedItems:[{
        productName:{
            type:String,
        },
        selected:[{type:String}]
    }],
    price:{
        type:Number,
    },
    status:{
        type:String,
    },
    orderDelivery:{
        type:String,
    },
    paymentOption:{
        type:String,
    },
    chosenAddress: {
        type: {
            userName:{type:String},
            userEmail:{type:String},
            userPhone:{type:String},
            address: { type: String},
            addressDetails: { type: String },
            city: { type: String },
            postalCode: { type: String },
        },
        default: null,
    },
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
}, { timestamps: true });
module.exports = mongoose.model('Orders', OrdersSchema);