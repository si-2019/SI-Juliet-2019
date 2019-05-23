const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const db = require('./src/DBComponents/db.js');
const app = express();
const upload = multer();
const Chatkit = require('@pusher/chatkit-server')
const sequelize = require('sequelize');

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:6b1113b2-48a5-47b6-a10e-41e73d5b3ac4',
  key: '1a6a40ad-eeb9-4c58-bed1-5def937b2998:lIOkO8lw/1aRrATwiFKCpwWebBgc8H59o+zYomXdPTM='
});

db.sequelize.sync()
  .then(() => console.log('Konektovano na bazu.'))
  .catch(e => console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// GET all Files
app.get('/files', (req, res) => {
  let filesTable = db.files;

  filesTable.findAll({}).then(data => res.status(200).json(data))
    .catch(err => res.send(err));
})


// POST File
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

// GET File
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

// DELETE Message
app.delete('/deleteMessage', (req, res) => {
  console.log(req.body);
  chatkit.deleteMessage({
      id: req.body.message_id
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => res.send(err))
})

// GET PinovanaPoruka
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

// GET PinovanePoruke
app.get('/pinovanePoruke', (req, res) => {
  let pinovanePorukeTabela = db.pinovanePoruke;
  pinovanePorukeTabela.findAll({}).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});

// POST PinovanaPoruka
app.post('/pinujPoruku', (req, res) => {
  let pinovanePorukeTabela = db.pinovanePoruke;
  let newRow = {
    messageCreatedAt: req.body.messageCreatedAt,
    messageId: req.body.messageId,
    roomId: req.body.roomId,
    senderId: req.body.senderId,
    text: req.body.text
  }
  pinovanePorukeTabela.create(newRow)
    .then(x => console.log(x))
    .catch(err => res.send(err));
});

// DELETE PinovanaPoruka
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

// POST AdminRole
app.post('/assignRoleAsAdmin', (req, res) => {
  chatkit.assignGlobalRoleToUser({
      userId: req.body.user_id,
      name: 'admin'
    }).then(res => res.sendStatus(200))
    .catch(err => res.send(err));
})

// GET Roles
app.get('/roles', (req, res) => {
  chatkit.getUserRoles({
      id: req.body.user_id
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => res.send(err))
});

// GET ColorScheme by name
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

// GET ColorScheme for user
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

// POST ColorScheme
app.post('/colorscheme', (req, res) => {
  let chatColorsTabela = db.chatColorScheme;
  let newRow = {
    userId: req.body.userId,
    colorId: req.body.colorId.hex,
  }
  chatColorsTabela.create(newRow)
    .then(x => console.log(x))
    .catch(err => res.send(err));
});

// DELETE ColorScheme
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

// GET Thread by messageId
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

// POST Thread
app.post('/thread', (req, res) => {
  db.threads.create({
    messageId: req.body.messageId
  }).then(() => {
    res.status(200).send("New thread created")
  }).catch(err => res.status(400).send(err));
})

// PUT Thread by messageId (add message to thread)
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

// POST Avatar
app.post('/updateAvatar', (req, res) => {
  chatkit.updateUser({
    id: req.body.currentUId,
    avatarURL: req.body.url
  }).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.json(err);
  });
});

// POST Poll
app.post('/poll/create', (req, res) => {
  db.polls.create({
    roomId: req.body.roomId,
    question: req.body.question
  }).then(result => {
    const queries = req.body.options.map(option => {
      return db.pollOptions.create({
        text: option,
        votes: 0,
        pollId: result.id
      });
    });

    Promise.all(queries).then(pollOptions => {
      res.status(200).send(JSON.stringify({ poll: result, pollOptions }));
    }).catch(err => {
      res.status(400).send(err);
    });
  }).catch(err => {
    res.status(400).send(err);
  });
});

app.listen(31910, () => console.log('Server pokrenut na portu 31910'));