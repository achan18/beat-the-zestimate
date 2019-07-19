const express = require('express');
const app = express();
const resultsAPI = require('./app');

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

resultsAPI();

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
