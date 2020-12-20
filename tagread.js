'use strict';

const get = require('lodash/get');

const defaultTransform = (tags, source) => get(tags, `${source}.description`, null);
const valueTransform = (tags, source) => get(tags, `${source}.value`, null);

const TAG_MAP = {
    title: {
        source: 'iptc.Object Name',
        transform: defaultTransform
    },
    description: {
        source: 'iptc.Caption/Abstract',
        transform: defaultTransform
    },
    datetime: {
        source: 'exif.DateTimeOriginal',
        transform: defaultTransform
    },
    height: {
        source: 'file.Image Height',
        transform: valueTransform
    },
    width: {
        source: 'file.Image Width',
        transform: valueTransform
    },
    location: {
        source: 'gps',
        transform: (tags, source) => {
            const lat = get(tags, `${source}.Latitude`);
            const lon = get(tags, `${source}.Longitude`);
            if (lat && lon) {
                return { lat, lon };
            } else {
                return null;
            }
        }
    }
};

const getTagValue = (tags, key) => {
    const { source, transform } = TAG_MAP[key];
    return transform(tags, source);
};

module.exports = {
    TAG_MAP,
    getTagValue
};
