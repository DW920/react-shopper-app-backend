const debug = require('debug')('app:server');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
// const session = require('express-session');
const http = require('http');
const apiRoutes = require('./api/routes');
const cors = require('cors');
require('./mockDatabase')(6000);


// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const router = express.Router();
// const client  = redis.createClient();
const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// app.use(session({
//   secret: process.env.SECRET_KEY,
//   // create new redis store.
//   store: new redisStore({ host: 'localhost', port: 5000, client: client, ttl : 260}),
//   saveUninitialized: false,
//   resave: false
// }));

const errorMiddleware = require('./api/middleware/errors');

app.use('/api', apiRoutes);
app.use(errorMiddleware);


http.createServer(app).listen(5000, () => {
  debug('listening on port 5000');
});
