//IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");

//EXPRESS/NODE
const app = express();
const PORT = 8080;

//MONGOOSE/MONGO
const uri = "mongodb://localhost:27017/timegarden";

mongoose
  .connect(uri)
  .then(() => {
    console.log(`Successfully connected to: ${uri}`);
  })
  .catch(err => console.log(err.message));

//ROUTER
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
