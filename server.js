require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,          
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// ==> accesslog route
const accesslog = require('./routes/log')
app.use('/access-log', accesslog)

// checkin  route
const checkin = require('./routes/checkin')
app.use('/check-in', checkin)

// checkout router
const checkout = require('./routes/checkout')
app.use('/checkout', checkout)


app.listen(8000, () => console.log("app started"))