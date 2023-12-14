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

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.get("/", (req, res) => {
    res.json("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server istening on port ${port}`);
  });
});
