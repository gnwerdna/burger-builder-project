require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./src/routes/user");
const orderRouter = require("./src/routes/order");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
//production mode


//db config
const db = require("./src/config/keys").mongoURL;

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(express.json());
app.use(userRouter);
app.use(orderRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
