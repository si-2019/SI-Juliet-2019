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

//GET: /files

/**
 * @swagger
 * /files:
 *    get:
 *      tags:
 *       - Fajlovi 
 *      description: 'Omogucava uvid u sve poslane fajlove unutar chata.
 *      Šalje se obični GET zahtjev, bez ikakvih dodatnih specifikacija u tijelu zahtjeva.
 *      Zato što vraća sve uploadovane fajlove u binarnom formatu ne preporučuje se pokretanje ove rute preko swagger-a.
 *      Autor: Nedzad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve atribute koji predstavljaju kolone unutar tabele fajlova.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       500:
 *         description: Vraca se JSON objekat - error poruka o grešci.
 */
app.get('/files', (req, res) => {
  let filesTable = db.files;
  filesTable.findAll({}).then(data => res.status(200).json(data))
    .catch(err => res.send(err));
})


/**
 * @swagger
 * /files/{roomId}:
 *    get:
 *      tags:
 *       - Fajlovi
 *      description: 'Dohvatanje svih fajlova koji upload-ovani u sobi sa proslijeđenim id-jem sobe (roomId).
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve fajlove koji su upload-ovani u toj sobi.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

app.get('/files/:roomId', (req, res) => {
  let filesTable = db.files;


  filesTable.findAll({
    where: {
      soba: roomId
    }
  }).then(data => res.status(200).json(data))
  .catch(err => res.status(400).send(err));
})

/**
 * @swagger
 * /postTest/{m1}:
 *    post:
 *      tags:
 *       - Test statusa servera 
 *      description: 'Testiranje post methode sa .params u njoj.
 *      Autor: Nedzad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: m1
 *         required: true
 *         type: string
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve atribute koji predstavljaju kolone unutar tabele fajlova.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 */

app.post('/postTest/:m1', (req,res)=>{
  let var1=req.params.m1;
  res.status(400).json(var1);
});

/**
 * @swagger
 * /upload:
 *    post:
 *      tags:
 *       - Fajlovi 
 *      description: 'Upload-ovanje fajlova
 *      Autor: Nedzad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *              name:
 *                type: string
 *              sender:
 *                type: string
 *              room:
 *                type: integer
 *       - in: files
 *         schema:
 *           type: object
 *           properties:
 *              mimetype:
 *                type: mimetype
 *              buffer:
 *                type: buffer
 *            
 *      required:
 *      responses:
 *       200:
 *         description: Vraca status da je dodan file i red iz tabele.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 */

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
    .then(x => res.status(200).send(x))
    .catch(err => res.send(err));
});



/**
 * @swagger
 * /download/{name}:
 *    get:
 *      tags:
 *       - Fajlovi
 *      description: 'Preuzimanje fajla sa proslijeđenim nazivom.
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: name
 *         type: string
 *         required: true
 *      required:
 *      responses:
 *       200:
 *         description: Preuzima se fajl.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */


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


/**
 * @swagger
 * /deleteMessage:
 *    post:
 *      tags:
 *       - Poruke 
 *      description: 'Brisanje poruka tako što se proslijedi id poruke.
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži podatke o obrisanoj poruci.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *          description: Greska.
 */

app.post('/deleteMessage', (req, res) => {
  chatkit.deleteMessage({
    id: req.body.message_id
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => res.status(400).send(err))
})

/**
 * @swagger
 * /pinovanePoruke/{name}:
 *    get:
 *      tags:
 *       - Fajlovi
 *      description: 'Podaci i sadržaj pinovane poruke sa prosliđenim id-jem.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: name
 *         type: string
 *         required: true
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži podatke pinovanoj poruci.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

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


/**
 * @swagger
 * /pinovanePoruke:
 *    get:
 *      tags:
 *       - Poruke 
 *      description: 'Omogućava pregled svih pinovanih poruka.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve poruke koje su pinovane.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *          description: Greška.
 */


app.get('/pinovanePoruke', (req, res) => {
  let pinovanePorukeTabela = db.pinovanePoruke;
  pinovanePorukeTabela.findAll({
  }).then(data => {
      res.status(200).json(data);
    })
    .catch(e => res.status(400).send(e))
});

/**
 * @swagger
 * /pinujPoruku:
 *    post:
 *      tags:
 *       - Poruke
 *      description: 'Upis poruke koja će se pinovati u bazu.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *              messageCreatedAt:
 *                type: string
 *              messageId:
 *                type: integer
 *              room:
 *                type: integer
 *              senderId:
 *                type: integer
 *              text:
 *                type: integer
 *      responses:
 *       200:
 *         description: Vraća se red koji je ubačen u tabelu.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

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
  .then(x => res.status(200).send(x))
  .catch(err => res.status(400).send(err));
});


/**
 * @swagger
 * /pinujPoruku/{name}:
 *    delete:
 *      tags:
 *       - Poruke
 *      description: 'Brisanje pinovane poruke sa određenim id-jem poruke.
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: name
 *         type: string
 *         required: true
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve podatke o obrisanoj poruci.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

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


/**
 * @swagger
 * /assignRoleAsAdmin:
 *    post:
 *      tags:
 *       - Uloge
 *      description: 'Dodjeljivanje Admin privilegije korisnicima.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: body
 *         name: user_id
 *         type: string
 *         required: true
 *      required:
 *      responses:
 *       200:
 *         description: Vraća samo status 200.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

app.post('/assignRoleAsAdmin', (req, res) => {
  chatkit.assignGlobalRoleToUser({
    userId: req.body.user_id,
    name: 'admin'
  }).then(res => res.sendStatus(200))
  .catch(err => res.status(400).send(err));
})


/**
 * @swagger
 * /roles:
 *    get:
 *      tags:
 *       - Uloge 
 *      description: 'Omogućava pregled svih Uloga na chatu.
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      produces:
 *       - application/x-www-form-urlencoded
 *      responses:
 *       200:
 *         description: Vraca se objekat sa parametrima za uloge.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *          description: Greska.
 */

app.get('/roles', (req, res) => {
  chatkit.getUserRoles({
    id: req.body.user_id
  })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => res.status(400).send(err))
})

/**
 * @swagger
 * /colorscheme/{name}:
 *    get:
 *      tags:
 *       - Boje
 *      description: 'Vraća podatke o boji sa proslijeđenim id-jem.
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: name
 *         type: string
 *         required: true
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve podatke o boji.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

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

//PREPRAVITI
/**
 * @swagger
 * /colorschemeUser/{name}:
 *    get:
 *      tags:
 *       - Boje
 *      description: 'Vraća podatke o boji sa proslijeđenim id-jem.
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: name
 *         type: string
 *         required: true
 *      required:
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve podatke o boji.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */



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

/**
 * @swagger
 * /colorscheme:
 *    post:
 *      tags:
 *       - Boje
 *      description: 'Dodavanje nove boje u bazu.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *              userId:
 *                type: string
 *              colorId.hex:
 *                type: string
 *      required:
 *      responses:
 *       200:
 *         description: Vraća se red iz tabele koji je ubačen.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */



app.post('/colorscheme', (req, res) => {
  let chatColorsTabela = db.chatColorScheme;
  let newRow = {
    userId: req.body.userId,
    colorId: req.body.colorId.hex,
  }
  chatColorsTabela.create(newRow)
  .then(x => res.status(200).send(x))
  .catch(err => res.status(400).send(err));
});

/**
 * @swagger
 * /colorscheme/{name}:
 *    delete:
 *      tags:
 *       - Boje
 *      description: 'Briše boju sa specificiranim id-jem.
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: name
 *         type: string
 *         required: true
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat data koji sadrži sve podatke o boji.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

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


/**
 * @swagger
 * /thread/{messageId}:
 *    get:
 *      tags:
 *       - Threads
 *      description: 'DODATI OPIS!
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: messageId
 *         type: string
 *         required: true
 *      responses:
 *       200:
 *         description: Ok.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

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


/**
 * @swagger
 * /thread:
 *    post:
 *      tags:
 *       - Threads
 *      description: 'DODATI OPIS!
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: body
 *         name: messageId
 *         type: string
 *         required: true
 *      responses:
 *       200:
 *         description: Ok.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

app.post('/thread', (req, res) => {
  db.threads.create({
    messageId: req.body.messageId
  }).then(() => {
      res.status(200).send("New thread created")
  }).catch(err => res.status(400).send(err));
})


/**
 * @swagger
 * /thread/{messageId}:
 *    put:
 *      tags:
 *       - Threads
 *      description: 'DODATI OPIS!
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: path
 *         name: messageId
 *         type: string
 *         required: true
*       - in: body
 *         schema:
 *           type: object
 *           properties:
 *              sender:
 *                type: string
 *              text:
 *                type: string
 *              id:
 *                type: integer
 *      responses:
 *       200:
 *         description: Ok.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

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
    }).catch(err => res.status(400).send(err));
  });
});


/**
 * @swagger
 * /updateAvatar:
 *    post:
 *      tags:
 *       - Avatar
 *      description: 'Promjena avatara na chat-u.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *              currentUId:
 *                type: string
 *              url:
 *                type: string
 *      responses:
 *       200:
 *         description: Vraća json sa porukom da je update-ovan avatar.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */


app.post('/updateAvatar', (req,res) =>{


  chatkit.updateUser({
    id:req.body.currentUId,
    avatarURL:req.body.url
  }).then(() => {
    res.status(200).json({message:'Avatar update-ovan'});
  }).catch((err)=>{
    res.status(400).json(err);
  });
})


/**
 * @swagger
 * /events:
 *    get:
 *      tags:
 *       - Događaji za kalendar 
 *      description: 'Omogućava pregled svih dodanih događaja (datuma početka kraj i sl.).
 *      Autor: Marko Nedić'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      responses:
 *       200:
 *         description: Vraca se niz objekata koji predstavljaju događaje.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *          description: Greska.
 */

app.get('/events', (req, res) => {
  let eventsTable = db.events;
  eventsTable.findAll({}).then(data =>  {
    res.status(200).json(data)})
    .catch(err => res.status(400).send(err));
})

/**
 * @swagger
 * /event:
 *    post:
 *      tags:
 *       - Događaji za kalendar
 *      description: 'Dodavanje novog događaja za kalendar.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *              kreirao:
 *                type: string
 *              naziv:
 *                type: integer
 *              pocetak:
 *                type: date
 *              kraj:
 *                type: date
 *      responses:
 *       200:
 *         description: Vraća se red koji je ubačen u tabelu.
 *         content: 
 *           application/json:
 *               data: 
 *                 type: object
 *       400:
 *         description: Greška.
 */

app.post('/event',(req,res)=>{
  let eventsTable = db.events;
  let newRow = {
    kreirao:req.body.kreirao,
    naziv: req.body.naziv,
    pocetak:req.body.pocetak,
    kraj:req.body.kraj
  }
 
  eventsTable.create(newRow)
  .then(x => res.status(200).send(x))
  .catch(err => res.status(400).send(err));
})

/**
 * @swagger
 * /test:
 *    get:
 *      tags: 
 *       - Test statusa servera
 *      description: 'Omogućava testiranje statusa servera.
 *      Autor: Nedžad Džindo'
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      required:
 *      responses:
 *       200:
 *         description: Request vraća samo statusni kod a to je 121.
 *        
 */

app.get('/test',(req, res)=>{
  res.status(200).send();
})

swagger_document(app);

app.listen(31910, () => console.log('Server pokrenut na portu 31910'));