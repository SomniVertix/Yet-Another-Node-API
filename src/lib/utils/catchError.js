/**
 * Utility function for catching route errors
 * Origin : https://github.com/fChristenson/flack/blob/master/src/lib/utils/catchError.js
 */

module.exports = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);