const userRoute = require('./User');
const categoriesRoute = require('./Categories');
const productsRoute = require('./Products');
const ordersRoute = require('./Orders');
const blogsRoute = require('./Blogs');
const homePageRoute = require('./HomePage');
const mountRoutes=(app)=>{
    app.use("/api/v1/user",userRoute)
    app.use("/api/v1/products",productsRoute)
    app.use("/api/v1/categories",categoriesRoute)
    app.use("/api/v1/orders",ordersRoute)
    app.use("/api/v1/blogs",blogsRoute)
    app.use("/api/v1/homepage",homePageRoute)
}

module.exports =mountRoutes;