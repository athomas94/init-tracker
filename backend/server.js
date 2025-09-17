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

//Update Health in Postgres
app.put('/api/update-health', async (req, res) => {
  console.log('Put request received at /api/update-health');
  console.log('Request Body:', req.body);

  const { characterId, changeHP, actionType } = req.body; // actionType = healing or damage

  if (!characterId || changeHP === undefined || !actionType) {
    console.log('Invalid data received');
    return res.status(400).json({ message: 'Invalid data' });
  }

  // Ensure changeHP is a number
  const numericChangeHP = Number(changeHP);

  // Check if the conversion is successful
  if (isNaN(numericChangeHP)) {
    console.log('Invalid changeHP value:', changeHP);
    return res.status(400).json({ message: 'Invalid health change value' });
  }

  // Determine if the change is damage or healing
  const healthChange = actionType === 'healing' ? numericChangeHP : -numericChangeHP;

  try {
    // Fetch current HP to update
    const result = await client.query(
      'SELECT "HP Current" FROM "Init Tracker" WHERE "Name" = $1',
      [characterId]
    );

    if (result.rowCount === 0) {
      console.log('Character not found in database');
      return res.status(404).json({ message: 'Character not found' });
    }

    // Calculate new HP
    const currentHP = Number(result.rows[0]["HP Current"]);
    const newHP = currentHP + healthChange;

    // Update the character's health in the database
    const updateResult = await client.query(
      'UPDATE "Init Tracker" SET "HP Current" = $1 WHERE "Name" = $2 RETURNING *',
      [newHP, characterId]
    );

    // Update the character's health in the party view
    const updateCharacter = await client.query(
      'UPDATE "Party" SET "HP Current" = $1 WHERE "Name" = $2',
        [newHP, characterId]
    );

    console.log('Initiative health updated successfully', updateResult.rows[0]);
    console.log('Party health updated successfully', updateCharacter.rows[0]);
    res.json({ message: 'Health updated successfully', character: updateResult.rows[0] });
  } catch (error) {
    console.error('Error updating health:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});