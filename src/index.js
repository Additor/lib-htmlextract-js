// Common Modules...
import _ from 'lodash';
import Cheerio from 'cheerio';
import IconvLite from 'iconv-lite';

// Own Modules...
import ContextExtractor from './contextExtractor';
import MetaExtractor from './metaExtractor';

// Local Fields...

/**
 *
 */
class HtmlExtractor {
  /**
   *
   * @param html {Buffer|string}
   * @param option {Object} [Optional]
   */
  constructor(html, option) {
    try {
      const charset = _.get(option, 'charset');

      const body = charset ? IconvLite.decode(html, charset) : html;
      this.$ = Cheerio.load(body);
    } catch (e) {
      throw e;
    }

    this.contextExtractor = new ContextExtractor(option).init(this.$);
    this.metaExtractor = new MetaExtractor(option).init(this.$);

    this.archive = {
      // Will be filled by extractors..
    };
  }

  brief() {
    if (_.isEmpty(archive)) {

    }
    return this.archive;
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getTitle(criteria) {
    const condition = {

    };
    return (this.archive.title || (this.archive.title = this.metaExtractor.title(condition)));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getURI(criteria) {
    const condition = {

    };
    return (this.archive.uri || (this.archive.uri = this.metaExtractor.uri(condition)));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getThumbnail(criteria) {
    const condition = {

    };
    return (this.archive.thumbnail || (this.archive.thumbnail = this.metaExtractor.thumbnail(condition)));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getDescription(criteria) {
    const condition = {

    };
    return (this.archive.description || (this.archive.description = this.metaExtractor.description(condition)));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {Array<string>}
   */
  getImages(criteria) {
    const condition = {

    };
    return (this.archive.images || (this.archive.images = this.metaExtractor.images(condition)));
  }

  /**
   *
   * @param html {Buffer|string}
   * @param option {Object}
   * @param option.encoding {string}
   *
   * @returns {HtmlExtractor|null}
   */
  static load(html, option) {
    try {
      return new HtmlExtractor(html, option);
    } catch (e) {
      return null;
    }
  }
}


export default HtmlExtractor;
