'use strict';

const tag = require('./tag');

const { fetch, ExifReader } = require('./mocks');

describe('tagging', () => {
  test('fetches image and passes it to ExifReader', async () => {
    const tags = await tag('/some-images-api-path', { fetch, ExifReader });

    expect(tags).toEqual({
        title: 'some_title',
        description: 'some_description',
        datetime: 'some_datetime',
        height: 'some_height',
        width: 'some_width',
        focalLength: 'some_focallength',
        exposure: 'some_shutterspeed',
        aperture: 'some_aperture',
        iso: 'some_iso',
        latitudeRef: 'some_latref',
        latitude: 'some_lat',
        longitudeRef: 'some_longref',
        longitude: 'some_long'
    });

    expect(fetch.mock.calls[0][0]).toBe('https://images.ctfassets.net/some-images-api-path');

    expect(ExifReader.load).toBeCalledWith('SOME_BUFF');
  });

  test('only includes tags that are present in image metadata', async () => {
    ExifReader.load.mockReturnValueOnce({
        title: {
            value: {},
            description: 'some_title'
        }
    });

    const tags = await tag('/some-images-api-path', { fetch, ExifReader });

    expect(tags).toEqual({
        title: 'some_title',
    });
  });

  test('throws when image cannot be fetched', async () => {
    expect.assertions(1);

    fetch.mockResolvedValueOnce({ status: 404 });

    try {
      await tag('/i-do-not-exist', { fetch, ExifReader });
    } catch (err) {
      expect(err.message).toBe(
        'Non-200 (404) response for GET https://images.ctfassets.net/i-do-not-exist.'
      );
    }
  });
});