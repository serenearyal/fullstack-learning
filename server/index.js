const express = require("express");
const app = express();
const port = 3001;

const db = require("./models");

db.sequelize.sync().then(() => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server istening on port ${port}`);
  });
});
