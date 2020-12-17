'use strict';

const IMAGES_BASE = 'https://images.ctfassets.net';

const SUPPORTED_TAGS_MAP = {
    'title': 'title',
    'description': 'description',
    'DateTimeOriginal': 'datetime',
    'Image Height': 'height',
    'Image Width': 'width',
    'FocalLength': 'focalLength',
    'ShutterSpeedValue': 'exposure',
    'ApertureValue': 'aperture',
    'ISOSpeedRatings': 'iso',
    'GPSLatitudeRef': 'latitudeRef',
    'GPSLatitude': 'latitude',
    'GPSLongitudeRef': 'longitudeRef',
    'GPSLongitude': 'longitude'
};

const fetchImage = async (imageUrl, fetch) => {
    const res = await fetch(
        imageUrl,
        {
            method: 'GET',
            headers: {
                range: 'bytes=0-131071',
            },
        }
    );

    if ((res.status === 200) || (res.status === 206)) {
        return res.buffer();
    } else {
        throw new Error(`Non-200 (${res.status}) response for GET ${imageUrl}.`);
    }
};

module.exports = async (path, { fetch, ExifReader }) => {
    const imageData = await fetchImage(IMAGES_BASE + path, fetch);
    const tags = ExifReader.load(imageData);

    const resTags = {};
    for (const [fromTag, toTag] of Object.entries(SUPPORTED_TAGS_MAP)) {
        if (fromTag in tags) {
            resTags[toTag] = tags[fromTag].description;
        }
    }

    return resTags;
};