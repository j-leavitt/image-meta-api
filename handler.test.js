'use strict';

const handle = require('./handler');
const mocks = require('./mocks');

describe('handler', () => {
  test('expects HTTP GET', async () => {
    const { status, body } = await handle('PUT', '/something', mocks);

    expect(status).toBe(405);
    expect(body).toEqual({ message: 'Method not allowed.' });
  });
});