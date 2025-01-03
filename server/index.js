const express = require("express");
const cors = require("cors");
const https = require("https");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const mountRoutes = require("./routes");
const braintree = require("braintree");
const allowedDomain = "https://derprinter.softforte.site";
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin === allowedDomain || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// app.use(cors());
app.options("*", cors());
app.use(express.json());

dotenv.config({ path: "config.env" });
mountRoutes(app);
const dbconnection = require("./config/dataBase");
dbconnection();

app.get('/initializeBraintree', async (req, res) =>  {
  const gateway = braintree.connect({
      "environment": braintree.Environment.Sandbox,
      "merchantId": "wsh3n5s833wk5nhf",
      "publicKey": "gtdmd33yhynb3dkr",
      "privateKey": "ce07203d0d5b7757306942a5d3c11259"
  });
  let token = (await gateway.clientToken.generate({})).clientToken;
  res.send({data: token});
});

app.post('/confirmBraintree', async (req, res) =>  {
  const data = req.body;
  const gateway = braintree.connect({
      "environment": braintree.Environment.Sandbox,
      "merchantId": "wsh3n5s833wk5nhf",
      "publicKey": "gtdmd33yhynb3dkr",
      "privateKey": "ce07203d0d5b7757306942a5d3c11259"
  });
  let transactionResponse = await gateway.transaction.sale({
      amount: data.amount,
      paymentMethodNonce: data.nonce,
      options: {
          submitForSettlement: true
        }
  });
  
  console.log(transactionResponse);
  res.send({data: transactionResponse});
});

const sslOptions = {
  key: fs.readFileSync("ssl/nginx-selfsigned.key"), // Path to your private key
  cert: fs.readFileSync("ssl/nginx-selfsigned.crt"), // Path to your certificate
};

const port = process.env.PORT || 9000;
const server = https
  .createServer(sslOptions, app)
  .listen(port, "0.0.0.0", () => {
    ;
  });

// const server=app.listen(port,() => {
//   console.log(`Server is running on port ${port}`);
// });



//Handel Rejection outside of express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors : ${err.name}|${err.message}`);
  server.close(() => {
    console.error(`Shutting down ....`);
    process.exit(1);
  });
});
