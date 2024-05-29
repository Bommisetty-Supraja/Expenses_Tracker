const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = 4000;
const corsConfig = {
  credentials: true,
  origin: true,
};
//middlewares
app.use(express.json());
app.use(cors(corsConfig));

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);
app.use("/users", require("./routes/users.router"));

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

app.get("/", (req, res) => {
  res.json({ msg: "connected" });
});

server();
