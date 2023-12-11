const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = 3001;

const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

db.sequelize.sync().then(() => {
  app.get("/", (req, res) => {
    res.json("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server istening on port ${port}`);
  });
});
