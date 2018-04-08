//IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
const config = require("config");

//EXPRESS/NODE
const app = express();
const PORT = process.env.PORT || config.PORT;

//MONGOOSE/MONGO
const MONGODB_URI = process.env.MONGODB_URI || config.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Successfully connected to: ${MONGODB_URI}`);
  })
  .catch(err => console.log(err.message));

//ROUTER
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
