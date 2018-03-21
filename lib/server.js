//IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//EXPRESS/NODE
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.use(bodyParser.json());

//MONGOOSE/MONGO
const uri = "mongodb://localhost:27017/timegarden";

mongoose
  .connect(uri)
  .then(() => {
    console.log(`Successfully connected to: ${uri}`);
  })
  .catch(err => console.log(err.message));

const Plant = require("./models/plant"); //importing our model

app.post("/plants", (req, res) => {
  const { plantName, description, percentTime, inGarden } = req.body;
  // instantiate new plant
  const plant = new Plant({
    plantName,
    description,
    percentTime,
    inGarden
  });
  plant
    .save() //save to db
    .then(doc => {
      // send back successful plant saved into db
      res.status(201).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

app.get("/plants", (req, res) => {
  Plant.find()
    .then(docs => {
      res.status(200).json({
        message: "success",
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

app.put("/plants/", (req, res) => {
  const { _id, plantName, description, percentTime, inGarden } = req.body;
  Plant.findByIdAndUpdate(
    { _id },
    { plantName, description, percentTime, inGarden }
  )
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(404).send({
        message: err.message
      });
    });
});

app.delete("/plants/:_id", (req, res) => {
  const { _id } = req.params;
  Plant.findByIdAndRemove({ _id })
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});
