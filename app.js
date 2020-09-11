const express = require("express");
const bodyParser = require("body-parser");
const userrouter = require("./routes/user");
const bookrouter = require('./routes/book')
const connectDb = require("./config/db")
connectDb()

const cors = require("cors");
const requestLogger = require("./utilities/requestlogger");
const errorLogger = require("./utilities/errorlogger");
const app = express();

app.use('/uploads',express.static('uploads'))
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger)
app.use('/user', userrouter);
app.use('/book',bookrouter)
app.use(errorLogger)

app.listen(4000);
console.log("Server listening in port 6000");


