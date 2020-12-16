'use strict';

const fetch = jest.fn().mockResolvedValue({
  status: 206,
  buffer: jest.fn().mockResolvedValue('SOME_BUFF')
});

const ExifReader = {
  load: jest.fn().mockReturnValue({
    title: {
        value: {},
        description: 'some_title'
    },
    description: {
        value: {},
        description: 'some_description'
    }
  })
};

module.exports = {
  fetch,
  ExifReader
};