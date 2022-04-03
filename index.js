const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const errorHandler = require('./errorHandler/errorHandler');

const app = express();
const url = 'mongodb+srv://companykvf:companykvf123@cluster0.xmlz7.mongodb.net/authentication';

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(url);
}
const con = mongoose.connection;
con.on('open', () => {
    console.log("connection with DB established");
})

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server listening the port 3000');
})
