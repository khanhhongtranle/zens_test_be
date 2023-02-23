const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const con = require('./db');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});
app.get('/jokes/:id', (req, res)=> {
  var sql = `SELECT * FROM jokes WHERE id = ${req.params.id}`;
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});
app.put('/jokes/:id/like', (req, res)=> {
  var sql = "UPDATE `jokes` SET `like` = `like` + 1 WHERE `id` = " + `${req.params.id}`;
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.send({message: 'ok'});
  });
});
app.put('/jokes/:id/dislike', (req, res)=> {
    var sql = "UPDATE `jokes` SET `dislike` = `dislike` + 1 WHERE `id` = " + `${req.params.id}`;
    con.query(sql, function(err, results) {
      if (err) throw err;
      res.send({message: 'ok'});
    });
  });
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
