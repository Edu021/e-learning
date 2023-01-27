const mysql = require('mysql');
const credential = require('./credentials');

const connection = mysql.createConnection({
  host: credential.host,
  user: credential.user,
  password: credential.password,
  database: credential.database
});

// Function to perform CRUD operations
const crud = {
  create: (data, table, callback) => {
      const query = `INSERT INTO ${table} SET ?`;
      connection.query(query, data, (error, results) => {
          if (error) {
              callback(error);
          } else {
              callback(null, results);
          }
      });
  },
  read: (table, fields, callback) => {
      const query = `SELECT ? FROM ${table}`;
      connection.query(query, fields, (error, results) => {
          if (error) {
              callback(error);
          } else {
              callback(null, results);
          }
      });
  },
  readFilter: (table, fields, filter, callback) => {
    // convert the fields array to a string
    fields = fields.join(', ');
    // create the query string
    const query = `SELECT ${fields} FROM ${table} WHERE ${filter}`;
    // execute the query
    connection.query(query, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
  },
  update: (data, table, id, callback) => {
      const query = `UPDATE ${table} SET ? WHERE id = ${id}`;
      connection.query(query, data, (error, results) => {
          if (error) {
              callback(error);
          } else {
              callback(null, results);
          }
      });
  },
  delete: (table, id, callback) => {
      const query = `DELETE FROM ${table} WHERE id = ${id}`;
      connection.query(query, (error, results) => {
          if (error) {
              callback(error);
          } else {
              callback(null, results);
          }
      });
  }
}

module.exports = crud;