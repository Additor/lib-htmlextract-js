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

  audio(condition) {
    const audioPriorities = [
      { tag: 'meta', attr: 'og:audio' },
    ];
    // TODO: Selecting Algorithm

    const map = { };
    audioPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

  images(condition) {
    const imagePriorities = [

    ];

    // TODO: Selecting
    const map = { };
    imagePriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

  keywords(condition) {
    const keywordPriorities = [
      { tag: 'meta', attr: 'keywords' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    keywordPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);

  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

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

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

  videos(condition) {
    const videoPriorities = [
      { tag: 'meta', attr: 'og:video' },
    ];

    // TODO: Selecting Algorithm
    const map = { };
    videoPriorities.forEach((priority) => {
      map[priority.attr] = priority;
    });

    const candidates = _.compact(this.metaList.map((meta) => {
      const prop = meta.property || meta.name;
      return (prop && map[prop])? meta.content : null;
    }));

    return _.uniq(candidates);
  }

}

export default MetaExtractor;
