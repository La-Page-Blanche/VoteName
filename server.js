const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const voteRoutes = require("./routes/vote.routes");
require("dotenv").config({ path: "./config/.env" });
const db  = require("./config/db");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};

app.use(cors(corsOptions));
db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/vote", voteRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });