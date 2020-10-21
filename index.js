const bodyParser = require('body-parser');
const cors = require("cors");
const express = require("express");
const fs = require("fs");

const port = 3000;

const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cors({ origin: true }));

api.get("/highscore", (request, response) => {
  const rawdata = fs.readFileSync("./data/highscores.json");
  const highscores = JSON.parse(rawdata);

  response.status(200).json(highscores);
});

api.post("/highscore", (request, response) => {
  const { highscores } = request.body;

  const data = JSON.stringify(highscores);
  fs.writeFileSync("./data/highscores.json", data);

  response.status(200).send("OK");
});

api.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
