const mongoose = require('mongoose');
const CategoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    headLine:{
        type:String,
    },
    prop1:{
        type:String,
    },
    prop2:{
        type:String,
    },
    prop3:{
        type:String,
    },
    title:{
        type:String,
        
    },
    description1:{
        type:String,
    },
    description2:{
        type:String,
    },
    image:{
        type:String,
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }]
}, { timestamps: true });
module.exports = mongoose.model('Categories', CategoriesSchema);