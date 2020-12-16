'use strict';

const PORT = process.env.PORT || 4000;

require('./app').listen(PORT, () => console.log(`Listening on ${PORT}...`));
