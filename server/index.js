const express = require('express');
const { db } = require('./config/db');
const cors = require("cors");
const winston = require('winston');
const { webUserRoutes } = require('./routes/WebRoute');
// const { UserRoute } = require('./routes/WebRoute');
// const { LoginRoute } = require('./routes/LoginRoute');


require('dotenv').config();

db.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', webUserRoutes);
// app.use('/api/sign-in', LoginRoute);


app.listen(3001);