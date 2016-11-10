'use strict';

// Common Modules...
const Assert = require('chai').assert;
const Request = require('request');

// Own Modules...
const Extractor = require('../../lib/html-extract').default;

// Local Fields...

describe('In Webpage Test', () => {
  before(() => {

  });

  describe('URL Request Test', () => {
    it('', (done) => {
      const opt = {
        url: 'https://additor.io',
        encoding: null,
      };

      Request(opt, (err, response, html) => {
        if (err) {
          reject(err);
          return;
        }

        // Charset Encoding Adjustment
        const charset = _.get(response, 'headers.content-type', '').split('charset=')[1];
        const option = {
          charset,
        };

        const extractor = Extractor.load(html, option);
        const title = extractor.getTitle();
        const desc = extractor.getDescription();
        const thumbnail = extractor.getThumbnail();
        const uri = extractor.getURI();
        const favicon = extractor.getFavicon();

        done();
      });
    }).timeout(0);
  })
});
