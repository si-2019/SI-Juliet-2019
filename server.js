const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const db = require('./src/DBComponents/db.js');
const app = express();
const upload = multer();
const Chatkit = require('@pusher/chatkit-server')

db.sequelize.sync()
.then(() => console.log('Konektovano na bazu.'))
.catch(e => console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.post('/upload', upload.any(), (req, res) => {
    let filesTable = db.files;

    let newRow = {
      naziv: req.body.name,
      posiljaoc: req.body.sender,
      soba: req.body.room,
      mimetype: req.files[0].mimetype,
      file: req.files[0].buffer
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
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
})

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:6b1113b2-48a5-47b6-a10e-41e73d5b3ac4',
  key: '1a6a40ad-eeb9-4c58-bed1-5def937b2998:lIOkO8lw/1aRrATwiFKCpwWebBgc8H59o+zYomXdPTM='
});

app.post('/deleteMessage', (req, res) => {
  chatkit.deleteMessage({
    id: req.body.message_id
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => res.send(err))
})


app.get('/pinovanePoruke/:name', (req, res) => {
  let pinovanePorukeTabela = db.pinovanePoruke;
  pinovanePorukeTabela.count({
    where: {
      messageId: req.params.name
    }
  }).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});
app.get('/pinovanePoruke', (req, res) => {
  let pinovanePorukeTabela = db.pinovanePoruke;
  pinovanePorukeTabela.findAll({
  }).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});
app.post('/pinujPoruku', (req, res) => {
  let pinovanePorukeTabela = db.pinovanePoruke;
  let newRow = {
    messageCreatedAt: req.body.messageCreatedAt,
    messageId: req.body.messageId,
    roomId: req.body.roomId,
    senderId: req.body.senderId,
    text: req.body.text
  }
  console.log(newRow);
  pinovanePorukeTabela.create(newRow)
  .then(x => console.log(x))
  .catch(err => res.send(err));
});
app.delete('/pinujPoruku/:name', (req, res) => {
  let pinovanePorukeTabela = db.pinovanePoruke;
  pinovanePorukeTabela.destroy({
    where: {
      messageId: req.params.name
    }
  }).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});
app.post('/assignRoleAsAdmin', (req, res) => {
  chatkit.assignGlobalRoleToUser({
    userId: req.body.user_id,
    name: 'admin'
  }).then(res => res.sendStatus(200))
  .catch(err => res.send(err));
})

app.get('/roles', (req, res) => {
  chatkit.getUserRoles({
    id: req.body.user_id
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => res.send(err))
})



app.listen(31910, () => console.log('Server pokrenut na portu 31910'));