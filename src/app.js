const express = require('express');
require("./db/mongoose");
const app = express();

const userRouter = require('./routes/user');
const burgerRouter = require('./routes/burger');

const PORT = process.env.PORT;

app.use(express.json());

app.use(userRouter);
app.use(burgerRouter);

app.listen(PORT, () => {
    console.log("Server is up on port " + PORT);
})