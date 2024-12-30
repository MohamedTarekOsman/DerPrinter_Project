const mongoose = require('mongoose');
const dbConnection=()=>{
    mongoose.connect(process.env.DB_URI).then((connection)=>{
        
    })
}
module.exports = dbConnection;