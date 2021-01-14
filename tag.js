'use strict';

const {TAG_MAP, getTagValue} = require('./tagread');

const IMAGES_BASE = 'https://images.ctfassets.net';

// fetches only 128kb of image data to obtain metadata
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
    // fetch image metadata
    const imageData = await fetchImage(IMAGES_BASE + path, fetch);

    // extract metadata tags using ExifReader
    const tags = ExifReader.load(imageData, {expanded: true});

    // map metadata tags to api output using tag read utilities
    const resTags = {};
    for (const key of Object.keys(TAG_MAP)) {
        resTags[key] = getTagValue(tags, key);
    }

    return resTags;
};
