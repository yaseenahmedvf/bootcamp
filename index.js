require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bootcampRoutes = require('./routes/bootcamp.routes');
const errorHandler = require('./errorHandler/errorHandler');
const authRoutes = require('./routes/auth.routes');
const formattedResponse = require('./middleware/response.middleware');

const app = express();
const url = process.env.URL;

//connection with mongo db
main().catch(error => console.log(error));
async function main() {
    await mongoose.connect(url);
}
const con = mongoose.connection;
con.on('open', () => {
    console.log("Connection established successfully...");
})
const port = process.env.PORT;
//http req, res cycle handling
app.use(bodyparser.json());
app.use('/api/bootcamps', bootcampRoutes);
app.use('/api/auth', authRoutes);   //routes of signup and signin
app.use('*', (req, res, next) => next(new Error(400)));
app.use(formattedResponse); //middleware for response to filter data
app.use(errorHandler);

//port setting
app.listen(port, () => {
    console.log(`Server start listening port ${port}...`);
})