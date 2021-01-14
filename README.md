# image-meta-api

A simple Express backend to serve image metadata to the [corresponding Contentful app frontend](https://github.com/j-leavitt/image-meta-frontend).

This project is modification of the [Contentful ai-image-tagging](https://github.com/contentful/apps/tree/master/apps/ai-image-tagging) lambda service backend to support image metadata extraction.

The server currently uses [ExifReader](https://github.com/mattiasw/ExifReader) to extract the following pieces of metadata from the source image (with ExifReader source in parentheses):

- title (iptc.Object Name)
- description (iptc.Caption/Abstract)
- datetime (exif.DateTimeOriginal)
- height: (file.Image Height)
- width: (file.Image Width)
- location: (gps)

## Installation

```
yarn install
```

## Local Deployment

```
yarn serve
```

Will serve on port defined by PORT environment variable, or default to port 4000.

## Remote Deployment

Deployable without modification to [Heroku](https://www.heroku.com/).

Currently hard-coded to accept all cross-origin requests.

## Usage

The Node server exposes a single endpoint: /exif/{path-to-Contentful-image}

The server retrieves the first 128kB of the image at https://images.ctfassets.net/{path-to-Contentful-image}, extracts image metadata using [ExifReader](https://github.com/mattiasw/ExifReader), and returns a transformed version of the metadata as JSON in the following format:

```
{
    title: string,
    description: string,
    datetime: string,
    height: integer,
    width: integer,
    location: {lat: float, long: float}
}
```

See the [app frontend](https://github.com/j-leavitt/image-meta-frontend) for use within Contentful.

See the [Contentful Images API reference](https://www.contentful.com/developers/docs/references/images-api/) for more on the structure of Contentful image paths.
