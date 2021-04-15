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
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${process.env.API_KEY}`
    );
    const jsonData = await data.json();
    //console.log(jsonData);
    res.send(jsonData);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
