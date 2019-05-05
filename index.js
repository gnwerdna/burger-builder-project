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
app.use(express.static(path.join(__dirname, 'client/build')));
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname = "client/build/index.html"));
  });
}

//build mode 
app.get('*', (req, res) => {
  res.sendFile(__dirname + "/client/public/index.html");
});

//db config
const db = require("./src/config/keys").mongoURL;

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(express.json());

app.use(userRouter);
app.use(orderRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
