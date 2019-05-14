const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const db = require('./src/DBComponents/db.js');

const app = express();
const upload = multer();

db.sequelize.sync()
.then(() => console.log('Konektovano na bazu.'))
.catch(e => console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

// /upload/:name/:roomId/:userId'
app.post('/upload', upload.any(), (req, res) => {
    let filesTable = db.files;

    let newRow = {
      naziv: req.body.name,
      posiljaoc: req.body.sender,
      soba: req.body.room,
      mimetype: req.files[0].mimetype,
      file: req.files[0]
    }

    filesTable.create(newRow)
    .then(x => res.send(x))
    .catch(err => res.send(err));
});

app.get('/download/:name', (req, res) => {
  let filesTable = db.files;

  filesTable.findOne({
    where: {
      naziv: req.params.name
    }
  }).then(data => {
      res.json(data);
    })
    .catch(e => res.status(400).send(e))
})

app.listen(31910, () => console.log("Server pokrenut na portu 31910"));






