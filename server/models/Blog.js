const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    image1:{
        type:String
    },
    image2:{
        type:String
    },
    name:{
        type:String
    },
    title:{
        type:String
    },
    description1:{
        type:String
    },
    description2:{
        type:String
    },
    description3:{
        type:String
    },
    category:{
        type:String
    },
    link:{
        type:String
    }
}, { timestamps: true });
module.exports = mongoose.model('Blog', BlogSchema);