const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  queryDatabaseSelect("SELECT name FROM people", (error, nomes) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erro ao buscar dados no banco de dados");
    } else {
      var listNames = "";
      var h1 = `<h1>Full Cycle Rocks!</h1> \n`;
      nomes.forEach((nome) => {
        listNames = listNames + `<p> - ${nome} </p>\n`;
      });
      res.send(h1 + listNames);
    }
  });
});

app.post("/", (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res
      .status(400)
      .json({ error: 'Campo "name" não fornecido no corpo da requisição.' });
  }

  queryDatabaseInsert(
    `INSERT INTO people(name) values('${name}')`,
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erro ao inserir dados no banco de dados");
      }
    }
  );
  res.status(201).json({ message: `O nome ${name} foi recebido com sucesso.` });
});

function queryDatabaseSelect(sql, callback) {
  connection.query(sql, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      const nomes = results.map((row) => row.name);
      callback(null, nomes);
    }
  });
}

function queryDatabaseInsert(sql, callback) {
  connection.query(sql, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } 
  });
}

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
