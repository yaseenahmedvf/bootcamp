require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bootcampRoutes = require('./routes/bootcamp.routes');
const errorHandler = require('./errorHandler/errorHandler');
const authRoutes = require('./routes/auth');
const formattedResponse = require('./middleware/response.middleware');

const app = express();
const url ='mongodb+srv://companykvf:companykvf123@cluster0.xmlz7.mongodb.net/bootcamp';

//connection with mongo db
main().catch(error => console.log(error));
async function main() {
    await mongoose.connect(url);
}
const con = mongoose.connection;
con.on('open', () => {
    console.log("Connection established successfully...");
})

//http req, res cycle handling
app.use(bodyparser.json());
app.use('/api/bootcamps', bootcampRoutes);
app.use('/api/auth', authRoutes);   //routes of signup and signin
app.use('*', (req, res, next) => next(new Error(400)));
app.use(formattedResponse); //middleware for response to filter data
app.use(errorHandler);

//port setting
app.listen(2000, () => {
    console.log("Server start listening port 2000...");
})