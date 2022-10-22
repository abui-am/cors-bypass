// packages import
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
// enable CORS
app.use(cors());
// set the port on which our app wil run
// important to read from environment variable if deploying
const port = process.env.PORT || 5000;

// basic string route to prevent Glitch error
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/fee-assessment-books', async (req, res) => {
  // replace with a custom URL as required

  try {
    console.log(req.query);
    const response = await axios.get(
      'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books',
      { params: req.query }
    );

    res.send(response.data);
  } catch (e) {
    if (e.response.status === 404) {
      res.status(200).send([]);
    } else {
      res.status(e.response.status).send(e);
    }
  }
});

// the route we're working with
app.get('/fee-assessment-categories', async (req, res) => {
  // replace with a custom URL as required
  try {
    const response = await axios.get(
      'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories',
      {
        params: req.query.params,
      }
    );
    res.send(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

// console text when app is running
app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`);
});
