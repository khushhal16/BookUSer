const fs = require("fs");

let errorLogger = (err, req, res, next) => {
  if (err) {
    fs.appendFile(
      "ErrorLogger.txt",
      new Date().toDateString() + " - " + err.stack + "\n",
      (error) => {
        if (error) {
          console.log("logging error failed");
        }
      }
    );
    //console.log("err= ", err);
    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    console.log(err.message);
    res.json({ message: err.message });
  }
  next();
};

module.exports = errorLogger;
