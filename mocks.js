'use strict';

const fetch = jest.fn().mockResolvedValue({
    status: 206,
    buffer: jest.fn().mockResolvedValue('SOME_BUFF')
});

const ExifReader = {
    load: jest.fn().mockReturnValue({
        file: {
            'Image Height': {
                value: 100,
                description: '100px'
            },
            'Image Width': {
                value: 200,
                description: '200px'
            }
        },
        exif: {
            DateTimeOriginal: {
                value: {},
                description: 'some_datetime'
            }
        },
        gps: {
            Latitude: 44.25,
            Longitude: -115.25
        },
        iptc: {
            'Object Name': {
                value: {},
                description: 'some_title'
            },
            'Caption/Abstract': {
                value: {},
                description: 'some_description'
            }
        }
    })
};

module.exports = {
    fetch,
    ExifReader
};