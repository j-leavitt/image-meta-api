'use strict';

const defaultTransform = (tags, key) => tags[key].description;
const valueTransform = (tags, key) => tags[key].value;
const gpsRefTransform = (tags, key) => tags[key].value[0];

const SUPPORTED_TAGS_MAP = {
    'title': 'title',
    'description': 'description',
    'DateTimeOriginal': 'datetime',
    'Image Height': {
        label: 'height',
        transform: valueTransform
    },
    'Image Width': {
        label: 'width',
        transform: valueTransform
    },
    'FocalLength': 'focalLength',
    'ShutterSpeedValue': 'exposure',
    'ApertureValue': 'aperture',
    'ISOSpeedRatings': 'iso',
    'GPSLatitudeRef': {
        label: 'latitudeRef',
        transform: gpsRefTransform
    },
    'GPSLatitude': 'latitude',
    'GPSLongitudeRef': {
        label: 'longitudeRef',
        transform: gpsRefTransform
    },
    'GPSLongitude': 'longitude'
};

const getTag = (tags, fromTag) => {
    const newTag = {};

    if (typeof(SUPPORTED_TAGS_MAP[fromTag]) === 'string') {
        newTag.key = SUPPORTED_TAGS_MAP[fromTag];
        newTag.value = defaultTransform(tags, fromTag);
    } else {
        newTag.key = SUPPORTED_TAGS_MAP[fromTag].label;
        newTag.value = SUPPORTED_TAGS_MAP[fromTag].transform(tags, fromTag);
    }

    return newTag;
};

module.exports = {
    SUPPORTED_TAGS_MAP,
    getTag
};
