const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;

const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.get("/", (req, res) => {
    res.json("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server istening on port ${port}`);
  });
});
