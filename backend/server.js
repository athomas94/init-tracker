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
    .then(() => console.log('Connected to Postgres'))
    .catch((err) => console.error("Connection error", err.stack));

app.get('/message', (req, res) => {
    console.log('Receieved Request');
    res.json({message: 'Success From Server'});    
});

// Fetch all characters in initiative
app.get('/api/characters', (req, res) => {
    const query = 'SELECT * FROM "Init Tracker"'; 
    
    client.query(query)
      .then(result => {
        res.json(result.rows); // Send back rows of character data
      })
      .catch(err => {
        console.error('Error fetching characters:', err);
        res.status(500).json({ error: 'Failed to fetch characters' });
      });
  });

// Fetch all player characters
app.get('/api/party', (req, res) => {
  const query = 'SELECT * FROM "Party"'; 
  
  client.query(query)
    .then(result => {
      console.log(result.rows);
      res.json(result.rows); // Send back rows of character data
    })
    .catch(err => {
      console.error('Error fetching party:', err);
      res.status(500).json({ error: 'Failed to fetch party' });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});