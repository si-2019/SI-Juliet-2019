const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const options = {
    swaggerDefinition: {
        info: {
            title: 'Rute tima Juliet (chat modul).',
            version: '1.0.0', 
            description: 'Opis ruta i api-ja za chat modul',
        },
        host : 'localhost:31910',
        basePath: '/',
        servers : [ {
            url : 'http://localhost:3000',
            description : "Frontend server koji koristi ovaj rest api."
        }]
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./server.js'],
};


const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/swagger-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    })
    app.use('/', swaggerUi.serve, swaggerUi.setup(specs));
}
