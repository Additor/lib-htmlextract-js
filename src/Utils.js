"use strict";
// Common Modules...
import _ from 'lodash';

// Own Modules...


// Local Fields...
const mDefaultCondition = {
  size: 1,
  offset: 0,
};

exports.reviseCondition = (criteria) => {
  const mCriteria = _.defaults(criteria, mDefaultCondition);

  return {
    size: _.isNumber(mCriteria.size) ? mCriteria.size : mDefaultCondition.size,
    offset: _.isNumber(mCriteria.offset) ? mCriteria.offset : mDefaultCondition.offset,
    domain: _.isString(mCriteria.domain) ? mCriteria.domain : '',
  };
};

exports.adjustRelativeURL = (url, domain) => {
  if (/^\/[^/]/.test(url)) {
    return domain + url;
  }
  return url;
};
