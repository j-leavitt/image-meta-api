'use strict';

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const ExifReader = require('exifreader');

const handle = require('./handler');

const deps = {
  fetch,
  ExifReader
};

const corsOptions = {
  origin: true
};

const app = express();

app.use(cors(corsOptions));

app.use('/exif', async (req, res) => {
  const { status, body } = await handle(req.method, req.path, deps);
  res.status(status).json(body);
});

// catch 404
app.use((_req, res) => res.status(404).send('Not found'));

module.exports = app;
