const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Connect Database
connectDB();

//Init middleware
app.use(cors());
app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) =>
  res.json({
    msg: 'Welcome to PetFinder api'
  })
);

//Define routes

app.use('/api/users', require('./routes/users'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
