const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://bhartimontu231_db_user:nykqiGtvJPVhMzNb@namastenode.zoojjo4.mongodb.net/devTinder")
}

module.exports = connectDB;

