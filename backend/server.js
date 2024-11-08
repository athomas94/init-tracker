const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/message', (req, res) => {
    res.json({message: 'Success From Server'});    
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});