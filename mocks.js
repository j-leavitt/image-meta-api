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
    },
    DateTimeOriginal: {
        value: {},
        description: 'some_datetime'
    },
    'Image Height': {
        value: 100,
        description: '100px'
    },
    'Image Width': {
        value: 200,
        description: '200px'
    },
    FocalLength: {
        value: {},
        description: 'some_focallength'
    },
    ShutterSpeedValue: {
        value: {},
        description: 'some_shutterspeed'
    },
    ApertureValue: {
        value: {},
        description: '5.60'
    },
    ISOSpeedRatings: {
        value: {},
        description: 100
    },
    GPSLatitudeRef: {
        value: [
            'N'
        ],
        description: 'some_latref'
    },
    GPSLatitude: {
        value: {},
        description: 44.55567313666667
    },
    GPSLongitudeRef: {
        value: [
            'W'
        ],
        description: 'some_longref'
    },
    GPSLongitude: {
        value: {},
        description: 72.78534460833333
    }
  })
};

module.exports = {
  fetch,
  ExifReader
};