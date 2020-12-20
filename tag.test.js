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
        height: 100,
        width: 200,
        location: {
          lat: 44.25,
          lon: -115.25
        }
    });

    expect(fetch.mock.calls[0][0]).toBe('https://images.ctfassets.net/some-images-api-path');

    expect(ExifReader.load).toBeCalledWith('SOME_BUFF', {expanded: true});
  });

  test('returns null values for fields that cannot be resolved from image metadata', async () => {
    ExifReader.load.mockReturnValueOnce({
      iptc:{  
        'Object Name': {
            value: {},
            description: 'some_title'
        }
      }
    });

    const tags = await tag('/some-images-api-path', { fetch, ExifReader });

    expect(tags).toEqual({
        title: 'some_title',
        description: null,
        datetime: null,
        height: null,
        width: null,
        location: null
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