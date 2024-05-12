require('dotenv').config();
const mongoose = require('mongoose'); 
mongoose.set('strictQuery', true);
const mongoURI = process.env.DB_URL;

// Connecting to MongoDB Atlas through Mongo URI
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {  
        console.log('Connected to Mongoose Successfully');
    })
}

module.exports = connectToMongo;
