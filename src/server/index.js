require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

app.post("/roverData", async (req, res) => {
  const { rover } = req.body;
  console.log(rover);
  try {
    const data = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${process.env.API_KEY}`
    );
    const jsonData = await data.json();
    //console.log(jsonData);
    res.send(jsonData);
  } catch (e) {
    console.log(e);
  }
});

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
