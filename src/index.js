// Common Modules...
import _ from 'lodash';
import Cheerio from 'cheerio';
import IconvLite from 'iconv-lite'

// Own Modules...
import ContextExtractor from './ContextExtractor';
import MetaExtractor from './MetaExtractor';
import Utils from './Utils';

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
      const charset = _.get(option, 'charset', 'UTF-8').toUpperCase();

      const body = charset ? IconvLite.decode(html, charset) : html;
      this.$ = Cheerio.load(body);

    } catch (e) {
      console.error();
      throw e;
    }

    this.contextExtractor = new ContextExtractor(option).init(this.$);
    this.metaExtractor = new MetaExtractor(option).init(this.$);

    this.archive = {
      // Will be filled by extractors..
    };
  }

  /**
   *
   * @returns {Object}
   */
  brief() {
    const clone = _.cloneDeep(this.archive);
    _.keys(this.archive).forEach(prop => {
      const value = this.archive[prop];
      if (_.isArray(value)) {
        this.archive[prop] = value[0];
      }
    });
    return clone;
  }

  getArchive() {
    if (!_.isPlainObject(this.archive)) {
      this.archive = { };
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
    const condition = Utils.reviseCondition(criteria);

    const archive = this.getArchive();
    return (archive.title = this.metaExtractor.title(condition));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getURI(criteria) {
    const condition = Utils.reviseCondition(criteria);

    const archive = this.getArchive();
    return (archive.uri = this.metaExtractor.uri(condition));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getThumbnail(criteria) {
    const condition = Utils.reviseCondition(criteria);

    const archive = this.getArchive();
    return (archive.thumbnail = this.metaExtractor.thumbnail(condition));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getDescription(criteria) {
    const condition = Utils.reviseCondition(criteria);

    const archive = this.getArchive();
    return (archive.description = this.metaExtractor.description(condition));
  }

  /**
   *
   * @param criteria {Object}
   *
   * @returns {string}
   */
  getFavicon(criteria) {
    const condition = Utils.reviseCondition(criteria);

    const archive = this.getArchive();
    return (archive.favicon = this.metaExtractor.favicon(condition));
  }


  /**
   *
   * @param criteria {Object}
   *
   * @returns {Array<string>}
   */
  getImages(criteria) {
    const condition = Utils.reviseCondition(criteria);

    const archive = this.getArchive();
    return (archive.images = this.metaExtractor.images(condition));
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
export { Utils };
