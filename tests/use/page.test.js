'use strict';

// Common Modules...
const Assert = require('chai').assert;
const Request = require('request');

// Own Modules...
const Extractor = require('../../lib/html-extract').default;

// Local Fields...

describe('Browser 테스트', () => {
  before(() => {

  });

  describe('페이지 정보를 긁어온다.', () => {
    it('', (done) => {
      const opt = {
        url: 'http://news.naver.com/main/read.nhn?mode=LPOD&mid=sec&oid=001&aid=0008809803&isYeonhapFlash=Y',
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
        const desc = extractor.getDescription();
        const thumbnail = extractor.getThumbnail();

        console.log(extractor);
        done();
      });
    }).timeout(0);
  })
});
