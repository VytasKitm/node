const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');

app.use(express.urlencoded({extended:true}));
app.use(express.json())

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "afxRRFG251_Aqr7qR",
  database: "plantsDatabase",
  port: 3306
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/plants",(req,res)=>{
        let sql;

        // sql = `
        // INSERT INTO plants
        // (name, height, type)
        // VALUES (${req.body.name},
        //         ${req.body.height},
        //         ${req.body.type},)`;

        sql = `INSERT INTO plants
        (name, height, type)
        VALUES (?,?,?)`

        connection.query(sql, [req.body.name,req.body.height,req.body.type]);
        res.json({message: "data inserted",
          plant: {
            name: req.body.name,
            height: req.body.height,
            type: req.body.type,
          },
        });
});

// app.get('/:id/:name', (req, res) => {
//   res.send('Hello Worldaaa aaaaa!');
//   console.log(req.params.id)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})