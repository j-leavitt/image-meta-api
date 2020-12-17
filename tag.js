'use strict';

const {SUPPORTED_TAGS_MAP, getTag} = require('./tagread');

const IMAGES_BASE = 'https://images.ctfassets.net';

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
    for (const fromTag of Object.keys(SUPPORTED_TAGS_MAP)) {
        if (fromTag in tags) {
            const { key, value } = getTag(tags, fromTag);
            resTags[key] = value;
        }
    }

    return resTags;
};
