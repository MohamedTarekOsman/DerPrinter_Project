const express = require("express");
const cors = require("cors");
const https = require("https");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const mountRoutes = require("./routes");

app.use(cors());
app.options("*", cors());
app.use(express.json());

dotenv.config({ path: "config.env" });
mountRoutes(app);
const dbconnection = require("./config/dataBase");
dbconnection();

const sslOptions = {
  key: fs.readFileSync("ssl/nginx-selfsigned.key"), // Path to your private key
  cert: fs.readFileSync("ssl/nginx-selfsigned.crt"), // Path to your certificate
};

const port = process.env.PORT || 9000;
// const server = https
//   .createServer(sslOptions, app)
//   .listen(port, "0.0.0.0", () => {
//     console.log(`HTTPS Server is running on https://0.0.0.0:${port}`);
//   });

const server=app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});

//Handel Rejection outside of express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors : ${err.name}|${err.message}`);
  server.close(() => {
    console.error(`Shutting down ....`);
    process.exit(1);
  });
});
