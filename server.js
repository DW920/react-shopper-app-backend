const debug = require('debug')('app:server');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const apiRoutes = require('./api/routes');
require('./mockDatabase')(6000);

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const errorMiddleware = require('./api/middleware/errors');

app.use('/api', apiRoutes);
app.use(errorMiddleware);

http.createServer(app).listen(5000, () => {
  debug('listening on port 5000');
});
