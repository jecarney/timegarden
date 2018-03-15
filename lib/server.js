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

const Project = require("./models/project"); //importing our model

app.get("/projects", (req, res) => {
  Project.find()
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

app.post("/projects", (req, res) => {
  const { title, description } = req.body;
  // instantiate new project
  const project = new Project({
    name: title,
    description: description
  });
  project
    .save() //save to db
    .then(doc => {
      // send back successful project saved into db
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

app.delete("/projects/:id", (req, res) => {
  const id = req.params.id;
  Project.findByIdAndRemove({ _id: id }).then(doc => {
    res
      .status(200)
      .send({
        message: "success",
        payload: doc
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  });
});
