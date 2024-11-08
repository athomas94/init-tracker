require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Postgres Connection
const client = new Client({
    connectionString: process.env.DB_CONNECTIONSTRING
});
client.connect() 
    .then(() => {console.log('Connected to PostGres')
    .catch((err) => console.error("Connection error", err.stack));;
});

app.get('/message', (req, res) => {
    res.json({message: 'Success From Server'});    
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ${process.env.PORT}');
});