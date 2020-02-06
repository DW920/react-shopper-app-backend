const debug = require('debug')('app:database');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

const MockDatabase = (desiredPort) => {
  const app = express();
  app.use(bodyParser.json());

  const inMemoryDatabase = {
    cart: {
      hkeeling: [
        {
          name: 'iPhone X',
          cost: 222,
        },
        {
          name: 'Big Gulp',
          cost: 12,
        },
      ],
    },
    users: {
      hkeeling: {
        name: {
          first: 'harrison',
          last: 'keeling',
          full: 'harrison chase keeling',
        },
        password: 'notHashedPassword!',
        username: 'hckeeling',
      },
    },
  };

  app.get('/:table/:key', (req, res) => {
    const { params: { table, key } } = req;
    const storedTable = inMemoryDatabase[table];
    debug('fetching the key', key, 'in table', table);

    if (!storedTable) {
      return res
        .status(500)
        .json({ status: 'error', message: `Table "${table}" not found` });
    }

    const storedItem = storedTable[key];
    return storedItem !== undefined
      ? res.status(200).json(storedItem)
      : res
        .status(404)
        .json({ status: 'error', message: `Item for key "${key}" not found in table "${table}"` });
  });

  app.post('/:table/:key', (req, res) => {
    const { params: { table, key }, body } = req;
    const storedTable = inMemoryDatabase[table];
    if (!storedTable) {
      return res
        .status(500)
        .json({ status: 'error', message: `Table "${table}" not found` });
    }
    storedTable[key] = body;
    debug('storing', body, 'for the key', key, 'in table', table);
    return res.status(200).json(body);
  });

  http.createServer(app).listen(desiredPort, () => {
    debug(`listening on port ${desiredPort}`);
  });
};

module.exports = MockDatabase;
