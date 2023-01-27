const mysql = require('mysql');
const credential = require('./credentials');

// Create a connection to the database
const connection = mysql.createConnection({
    host: credential.host,
    user: credential.user,
    password: credential.password,
    database: credential.database
});

// Connect to the database
connection.connect();

// Create a new record
const createRecord = (data) => {
  const sql = 'INSERT INTO users SET ?';
  connection.query(sql, data, (error, results, fields) => {
    if (error) throw error;
    console.log('Record created: ', results.insertId);
  });
}

// Read all records
const readAllRecords = () => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });
}

// Update a record
const updateRecord = (id, data) => {
  const sql = 'UPDATE users SET ? WHERE user_id = ?';
  connection.query(sql, [data, id], (error, results, fields) => {
    if (error) throw error;
    console.log('Record updated: ', results.affectedRows);
  });
}

// Delete a record
const deleteRecord = (id) => {
  const sql = 'DELETE FROM users WHERE id_user = ?';
  connection.query(sql, id, (error, results, fields) => {
    if (error) throw error;
    console.log('Record deleted: ', results.affectedRows);
  });
}

// EXAMPLES
//createRecord({username: 'testemaluco', password: 'password233', email: 'testemaluco@example.com'});
//readAllRecords();
//updateRecord(5, {username: 'yourbraindead'});
//deleteRecord(5);

// Disconnect from the database
connection.end();
