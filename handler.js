'use strict';

const tag = require('./tag');

module.exports = async (method, path, { fetch, ExifReader }) => {
    if (method !== 'GET') {
        return {
            status: 405,
            body: { message: 'Method not allowed.' }
        };
    }

    try {
        return {
            status: 200,
            body: { tags: await tag(path, { fetch, ExifReader }) }
        };
    } catch (err) {
        return {
            status: 400,
            body: { message: err.message || err.errorMessage }
        };
    }
};