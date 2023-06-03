const express = require('express')
const app = express();
const apipath=require('./routes/api')
const config=require('./config')
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
app.use(express.json());
app.use('/api',apipath)
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})