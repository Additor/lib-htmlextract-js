// Common Modules...
import _ from 'lodash';
import Cheerio from 'cheerio';

// Own Modules...

// Local Fields...

/**
 *
 */
class ContextExtractor {

  /**
   *
   * @param option {Object}
   */
  constructor(option) {

  }

  /**
   *
   * @param $
   */
  init($) {
    this.$ = $;

    return this;
  }
}


export default ContextExtractor;
