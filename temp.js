var s = 1000;
var m = s * 60;
var u = m * 60;
var d = u * 24;
var w = d * 7;
var j = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is een lege string of geen valide nummer. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconden?|msec?|ms|seconden?|sec?|s|minuten?|min?|m|uren?|uur?|u|dagen?|dag?|d|weken?|week?|w|jaren?|jaar?|j)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'jaren':
    case 'jaar':
    case 'jr':
    case 'j':
    case 'y':
      return n * j;
    case 'weken':
    case 'week':
    case 'w':
      return n * w;
    case 'dagen':
    case 'dag':
    case 'd':
      return n * d;
    case 'uren':
    case 'uur':
    case 'u':
    case 'h':
      return n * u;
    case 'minuten':
    case 'minuut':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconden':
    case 'seconde':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconden':
    case 'milliseconde':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= u) {
    return Math.round(ms / u) + 'u';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return meervoud(ms, msAbs, d, 'dag', 'en');
  }
  if (msAbs >= u) {
    return meervoud(ms, msAbs, u, 'uur', 'en');
  }
  if (msAbs >= m) {
    return meervoud(ms, msAbs, m, 'minuut', 'en');
  }
  if (msAbs >= s) {
    return meervoud(ms, msAbs, s, 'seconde', 'n');
  }
  return ms + ' ms';
}

function meervoud(ms, msAbs, n, name, mvType) {
  var isMeervoud = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isMeervoud ? mvType : '');
}
