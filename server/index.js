const { response } = require("express");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

app.use(express());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001, () => {
  console.log("hi there!");
});

app.get("/get", (req, res) => {
  console.log("mazaavigiyo!");
  res.send("mazaavigiyo");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trail",
});

app.post("/submit", (req, res) => {
  const username = req.body.user_name;
  const password = req.body.user_password;
  db.query(
    "INSERT INTO trail_user (username, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/display", (req, res) => {
  console.log("hi max!");
  db.query("SELECT * FROM trail_user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.post("/delete", (req, res) => {
  console.log("dsf", req.body);
  const id = req.body.deleteId;
  db.query(`DELETE FROM trail_user WHERE id=${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.post("/update", (req, res) => {
  console.log("body  : ", req.body);
  const id = req.body.id;
  const user_name = req.body.username;
  const user_password = req.body.password;
  // console.log(id, "name : ", user_name, user_password);
  db.query(
    `UPDATE  trail_user SET username='${user_name}',password='${user_password}'  WHERE id=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});
