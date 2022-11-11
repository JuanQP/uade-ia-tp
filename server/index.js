const path = require('path');
const express = require("express");
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

// Use CORS
app.use(cors({
	origin: '*',
}));

// Parse request body to JSON
app.use(express.json());

require('./routes')(app);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
