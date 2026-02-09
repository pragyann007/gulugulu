// create basic express server with port 3000 and log all requests to the console using morgan middleware. Also, set up a route for the root path that returns a JSON response with a message "Hello World!". using typescript

import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

// Middleware to log requests
app.use(morgan('tiny'));

// Route for the root path
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});