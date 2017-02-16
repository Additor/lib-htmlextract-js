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
        url: 'https://www.washingtonpost.com/powerpost/now-6-republicans-are-on-the-fence-about-andrew-puzder/2017/02/15/e34cada6-f38b-11e6-8d72-263470bf0401_story.html?hpid=hp_hp-banner-main_puzder-135pm%3Ahomepage%2Fstory&utm_term=.08b3e67c9aff',
        encoding: null,
      };

      Request(opt, (err, response, html) => {
        if (err) {
          done(err);
          return;
        }

        // Charset Encoding Adjustment
        const charset = _.get(response, 'headers.content-type', 'charset=UTF-8').split('charset=')[1];
        const option = {
          charset: (charset && charset.toUpperCase()) || 'UTF-8',
        };

        const extractor = Extractor.load(new Buffer(html), option);
        const title = extractor.getTitle();
        const desc = extractor.getDescription();
        const thumbnail = extractor.getThumbnail();
        const uri = extractor.getURI();
        const favicon = extractor.getFavicon({ domain: 'http://news.naver.com/' });

        done();
      });
    }).timeout(0);
  })
});
