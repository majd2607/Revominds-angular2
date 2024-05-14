const express = require('express');
const sql = require('mssql/msnodesqlv8');

const app = express();
app.use(express.json());
const uuid = require("uuid")
const cors = require("cors")
app.use(cors())
// Define a connection pool
const pool = new sql.ConnectionPool({
  database: 'Auth',
  server: 'DESKTOP-FDCR8VU',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
});

// Connect to the database
pool.connect()
  .then(() => console.log('Connected to SQL Server'))
  .catch(err => console.error('Error connecting to SQL Server:', err));

// Define a login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Execute a query to check if the user exists and the password is correct
  pool.request()
    .input('email', sql.NVarChar, email)
    .input('password', sql.NVarChar, password)
    .query('SELECT * FROM Users WHERE email = @email AND password = @password')
    .then(result => {
      // If user exists and password is correct, return authToken and refreshToken
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
            // Trim all user attributes
    Object.keys(user).forEach(key => {
      if (typeof user[key] === 'string') {
          user[key] = user[key].trim();
      }
  });
        const authToken = uuid.v4(); // Generate authToken (simplified with UUID)
        const refreshToken = uuid.v4(); // Generate refreshToken (simplified with UUID)
        res.status(200).json({ authToken, refreshToken, user });
      } else {
        // If user doesn't exist or password is incorrect, return error
        res.status(401).json({ message: 'Invalid email or password' });
      }
    })
    .catch(err => {
      // If an error occurs during the query, return error
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Define a route to get user by ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  // Execute a query to fetch the user by ID
  pool.request()
    .input('id', sql.Int, userId)
    .query('SELECT * FROM Users WHERE id = @id')
    .then(result => {
      // If user with the provided ID exists, return the user
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        res.status(200).json(user);
      } else {
        // If user with the provided ID doesn't exist, return 404 error
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      // If an error occurs during the query, return 500 error
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
