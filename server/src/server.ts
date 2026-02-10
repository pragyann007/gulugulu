// create basic express server with port 3000 and log all requests to the console using morgan middleware. Also, set up a route for the root path that returns a JSON response with a message "Hello World!". using typescript

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './configs/db';

const app = express();
const PORT = 3001;

connectDB()

// Middleware to log requests
app.use(morgan('tiny'));

// setup cors
app.use(cors({
  origin: 'http://localhost:3000', // allow requests from this origin
  credentials: true, // allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Route for the root path
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/api/auth', require('./routes/auth.routes').default);
app.use('/api/sites', require('./routes/sites.routes').sitesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});