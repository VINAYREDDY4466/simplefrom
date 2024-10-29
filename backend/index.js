const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3002; // Port for your backend server

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Create MySQL connection
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "mydatabase"
});

// Connect to MySQL
con.connect(function(err) {
  if (err) {
    console.error("Connection error:", err.message);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Define API routes
app.post('/api/data', (req, res) => {
  const { name, email } = req.body; // Assuming you send name and email

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  con.query(sql, [name, email], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send('Data inserted successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
