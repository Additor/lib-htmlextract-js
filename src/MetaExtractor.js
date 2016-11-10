// Common Modules...
import _ from "lodash";

// Own Modules...

// Local Fields...


/**
 *
 * Reference: https://gist.github.com/lancejpollard/1978404
 */
class MetaExtractor {

  /**
   *
   * @param option {Object}
   */
  constructor(option) {
    this.metaList = [];
    this.linkList = [];
  }

  /**
   *
   * @param $
   *
   * @returns {MetaExtractor}
   */
  init($) {
    this.$ = $;

    // Meta Tag Listing...
    this.metaList = _.values($('meta')).filter((meta) => {
      const attribs = meta.attribs;
      if (_.isPlainObject(attribs)) {
        if (_.isString(attribs.content)) {
          return attribs.property || attribs.name;
        }
      }
      return false;
    }).map((meta) => meta.attribs);

    // Link Tag Listing...
    this.linkList = _.values($('link')).filter((link) => {
      const attribs = link.attribs;
      if (_.isPlainObject(attribs)) {
        if (_.isString(attribs.href)) {
          return attribs.rel || attribs.property || attribs.name;
        }
      }
      return false;
    }).map((link) => link.attribs);

    // Renew Inflating Time...
    this.inflateTime = Date.now();
    return this;
  }

  /**
   * Extract audio data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  audio(condition) {
    const audioPriorities = [
      { tag: 'meta', attr: 'og:audio' },
      { tag: 'audio' },
    ];
    // TODO: Selecting Algorithm

    const map = { };
    audioPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract author/creator data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  author(condition) {
    const authorPriorities = [
      { tag: 'meta', attr: 'og:article:author' },
      { tag: 'meta', attr: 'twitter:creator' },
      { tag: 'meta', attr: 'author' },
      { tag: 'meta', attr: 'owner' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    authorPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract category data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  categories(condition) {
    const categoryPriorities = [
      { tag: 'meta', attr: 'og:type' },
      { tag: 'meta', attr: 'twitter:site' },
      { tag: 'meta', attr: 'category' },
      { tag: 'meta', attr: 'Classification' },
      { tag: 'meta', attr: 'subject' },
      { tag: 'meta', attr: 'topic' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    categoryPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract contact data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  contact(condition) {
    const contactPriorities = [
      { tag: 'meta', attr: 'og:phone_number' },
      { tag: 'meta', attr: 'og:fax_number' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    contactPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract description data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  description(condition) {
    const descPriorities = [
      { tag: 'meta', attr: 'og:description' },
      { tag: 'meta', attr: 'twitter:description' },
      { tag: 'meta', attr: 'description' },
      { tag: 'meta', attr: 'summary' },
      { tag: 'meta', attr: 'abstract' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    descPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract email data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  email(condition) {
    const emailPriorities = [
      { tag: 'meta', attr: 'og:email' },
      { tag: 'meta', attr: 'reply-to' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    emailPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract favicon data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  favicon(condition) {
    const faviconPriorities = [
      { tag: 'link', attr: 'icon', attrName: 'rel', valueName: 'href' },
      { tag: 'link', attr: 'logo', attrName: 'rel', valueName: 'href' },
      { tag: 'link', attr: 'apple-touch-icon', attrName: 'rel', valueName: 'href' },
      { tag: 'link', attr: 'apple-touch-startup-image', attrName: 'rel', valueName: 'href' },
      { tag: 'link', attr: 'shortcut icon', attrName: 'rel', valueName: 'href' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    faviconPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.linkList.map((link) => {
      const prop = link.rel || link.name;
      return (prop && map[prop])? link.href : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract Image data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  images(condition) {
    const imagePriorities = [
      { tag: 'img' },
    ];

    // TODO: Selecting
    const map = { };
    imagePriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract keyword data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  keywords(condition) {
    const keywordPriorities = [
      { tag: 'meta', attr: 'keywords' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    keywordPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const keywordBundles = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? (meta.content && meta.content.split(/\s*(,|\.|;|:)?\s*/)) : null;
    }));
    const candidates = _.uniq(_.flattenDeep(keywordBundles));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract language data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  language(condition) {
    const langPriorities = [
      { tag: 'meta', attr: 'og:locale' },
      { tag: 'meta', attr: 'language' },
      { tag: 'meta', attr: 'content-language', attrName: 'http-equiv' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    langPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract location data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  location(condition) {
    const locationPriorities = [
      { tag: 'meta', attr: 'og:latitude' },
      { tag: 'meta', attr: 'og:longitude' },
      { tag: 'meta', attr: 'og:street-address' },
      { tag: 'meta', attr: 'og:locality' },
      { tag: 'meta', attr: 'og:region' },
      { tag: 'meta', attr: 'og:postal-code' },
      { tag: 'meta', attr: 'og:country-name' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    locationPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract thumbnail-image data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  thumbnail(condition) {
    const thumbnailPriorities = [
      { tag: 'meta', attr: 'og:image' },
      { tag: 'meta', attr: 'twitter:image' },
      { tag: 'meta', attr: 'me2:image' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    thumbnailPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract title data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  title(condition) {
    const titlePriorities = [
      { tag: 'meta', attr: 'og:title' },
      { tag: 'meta', attr: 'twitter:title' },
      { tag: 'meta', attr: 'title' },
      { tag: 'title' },
      { tag: 'meta', attr: 'application-name' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    titlePriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract fileType data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  type(condition) {
    const typePriorities = [
      { tag: 'meta', attr: 'og:video:type' },
      { tag: 'meta', attr: 'og:audio:type' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    typePriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract uri data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  uri(condition) {
    const uriPriorities = [
      { tag: 'meta', attr: 'og:url' },
      { tag: 'meta', attr: 'url' },
      { tag: 'meta', attr: 'identifier-URL' },
      { tag: 'meta', attr: 'msapplication-starturl' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    uriPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }

  /**
   * Extract video data.
   *
   * @param condition {Object}
   * @param condition.size {number} Number of results (Default: 1)
   * @param condition.offset {number} Number of result offset (Default: 0)
   *
   * @returns {Array<string>|string|undefined}
   */
  videos(condition) {
    const videoPriorities = [
      { tag: 'meta', attr: 'og:video' },
      { tag: 'video' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    videoPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.uniq(_.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    })));

    return condition.size > 1 ? candidates.slice(condition.offset, condition.size) : candidates[0];
  }
}

export default MetaExtractor;
