const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'name required']
    },
    email:{
        type:String,
        required:[true,'email required'],
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        trim:true
    },
    fbId:{
        type:String,
        trim:true
    },
    paymentOption:{
        type:String,
        default: "cash"
    },
    chosenAddress:{
        type: Number,
        default: 0
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
        },
        selectedItems: [{type:String}],
        price: {type: Number},
        image:{
            type:String,
        },
        orderDelivery:{
            type:String,
        },
    }],
    phone: {
        type: String
    },
    gender:{
        type: String,
        enum:['male','female'],
        default:'male'
    },
    role:{
        type: String,
        enum:['admin','company','user'],
        default:'user',
    },
    ratingStars:{
        type: Number,
        min: [1,'rating must be above 1'],
        max: [5,'rating must be below 5'],
    },
    ratingText:{
        type: String,
        trim: true
    },
    addresses:[{
        userName:{
            type: String,
        },userEmail:{
            type: String,
        },userPhone:{
            type: String,
        },
        address:{type:String},
        AddressDetails:{type:String},
        city:{type:String},
        postalCode:{type:String},
    }]
}, { timestamps: true });
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){ return next();}
    this.password = await bcrypt.hash(this.password,8)
    next()
})
module.exports = mongoose.model('User', UserSchema);