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
        value: {},
        description: 'some_height'
    },
    'Image Width': {
        value: {},
        description: 'some_width'
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
        description: 'some_aperture'
    },
    ISOSpeedRatings: {
        value: {},
        description: 'some_iso'
    },
    GPSLatitudeRef: {
        value: {},
        description: 'some_latref'
    },
    GPSLatitude: {
        value: {},
        description: 'some_lat'
    },
    GPSLongitudeRef: {
        value: {},
        description: 'some_longref'
    },
    GPSLongitude: {
        value: {},
        description: 'some_long'
    }
  })
};

module.exports = {
  fetch,
  ExifReader
};