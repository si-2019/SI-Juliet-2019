const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const db = require('./database/db.js');
const app = express();
const upload = multer();
const Chatkit = require('@pusher/chatkit-server')
const sequelize = require('sequelize');
const swagger_document=require('./swagger-document.js');


db.sequelize.sync()
.then(() => console.log('Konektovano na bazu.'))
.catch(e => console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());


app.get('/files', (req, res) => {
  let filesTable = db.files;

  filesTable.findAll({}).then(data => res.status(200).json(data))
    .catch(err => res.send(err));
})

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
app.get('/colorscheme/:name', (req, res) => {
  let chatColorsTabela = db.chatColorScheme;
  chatColorsTabela.count({
    where: {
      userId: req.params.name
    }
  }).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});
app.get('/colorschemeUser/:name', (req, res) => {
  let chatColorsTabela = db.chatColorScheme;
  chatColorsTabela.findOne({
    where: {
      userId: req.params.name
    }
  }).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});
app.post('/colorscheme', (req, res) => {
  let chatColorsTabela = db.chatColorScheme;
  let newRow = {
    userId: req.body.userId,
    colorId: req.body.colorId.hex,
  }
  console.log(newRow);
  chatColorsTabela.create(newRow)
  .then(x => console.log(x))
  .catch(err => res.send(err));
});
app.delete('/colorscheme/:name', (req, res) => {
  let chatColorsTabela = db.chatColorScheme;
  chatColorsTabela.destroy({
    where: {
      userId: req.params.name
    }
  }).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});

app.get('/thread/:messageId', (req, res) => {
  db.threads.findOne({
    where: {
      messageId: req.param('messageId')
    }
  }).then(result => {
    db.threadMessage.findAll({
      where: {
        threadId: result.id
      }
    }).then(messages => {
      res.status(200).json(messages);
    });
  }).catch(err => {
    res.status(400).send(err);
  })
});

app.post('/thread', (req, res) => {
  db.threads.create({
    messageId: req.body.messageId
  }).then(() => {
      res.status(200).send("New thread created")
  }).catch(err => res.status(400).send(err));
})

app.put('/thread/:messageId', (req, res) => {
  db.threads.findOne({
    where: {
      messageId: req.param('messageId')
    }
  }).then(result => {
    db.threadMessage.create({
        sender: req.body.sender,
        text: req.body.text,
        threadId: result.id
    }).then(message => {
      res.status(200).send(JSON.stringify(message));
    });
  });
});

app.post('/updateAvatar', (req,res) =>{
  console.log('Evo radi!');

  chatkit.updateUser({
    id:req.body.currentUId,
    avatarURL:req.body.url
  }).then(() => {
    res.json({message:'Avatar update-ovan'});
  }).catch((err)=>{
    res.json(err);
  });
})

app.get('/events', (req, res) => {
  let eventsTable = db.events;
  eventsTable.findAll({}).then(data => res.status(200).json(data))
    .catch(err => res.send(err));
})

app.post('/event',(req,res)=>{
  let eventsTable = db.events;
  let newRow = {
    kreirao:req.body.kreirao,
    naziv: req.body.naziv,
    pocetak:req.body.pocetak,
    kraj:req.body.kraj
  }
 
  console.log(newRow);
  eventsTable.create(newRow)
  .then(x => res.send(x))
  .catch(err => res.send(err));
})

app.get('/test',(req, res)=>{
  res.status(121).send();
})

swagger_document(app);

app.listen(31910, () => console.log('Server pokrenut na portu 31910'));