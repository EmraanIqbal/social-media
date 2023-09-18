const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose
        .connect(url, { useNewUrlParser: true })
        .then(() => console.log("Mongodb connected successfully"))
        .catch((err) => console.log(err));
};

module.exports = connectDB;