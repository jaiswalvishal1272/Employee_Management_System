const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.CONNECTION_STRING);