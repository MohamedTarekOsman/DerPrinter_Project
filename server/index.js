const express=require('express')
const cors=require('cors')
const app= express();
const dotenv=require('dotenv');
const mountRoutes=require('./routes');
app.use(cors());
app.options('*', cors());
app.use(express.json());
dotenv.config({path:"config.env"})
mountRoutes(app)
const dbconnection = require('./config/dataBase');
dbconnection()

const port=process.env.PORT||8000
const server=app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});

//Handel Rejection outside of express
process.on("unhandledRejection",(err)=>{
    console.error(`unhandledRejection Errors : ${err.name}|${err.message}`);
    server.close(()=>{
        console.error(`Shutting down ....`)
        process.exit(1);
    })
    
})