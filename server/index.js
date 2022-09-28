const path = require('path');
const express = require("express");
require('dotenv').config();
const db = require('./models');

const PORT = process.env.PORT || 3001;

const app = express();

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

db.sequelize.authenticate()
.then(() => {
	console.log('Connection with database has been established successfully.');
	db.sequelize.sync({ alter: true });
})
.catch((err) => {
	console.log(err);
});
