"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Leandro Silva
 * @copyright 2014, 2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 */

// jshint esversion: 6, node: true

var ELLIPSIS = "\u2026";

/**
 * @classdesc This class helps parse, format, and transform strings. It supports
 *            both Node and browser use.
 */

var Stringlish = function () {
  function Stringlish() {
    _classCallCheck(this, Stringlish);
  }

  _createClass(Stringlish, null, [{
    key: "firstLetterUpper",

    /**
     * Converts the first letter of a string to uppercase.
     * @param   {String} str The string to convert.
     * @returns {String} The converted string.
     */
    value: function firstLetterUpper(str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    }

    /**
     * Converts the first letter of every word to uppercase.
     * @param   {String} str The string to convert.
     * @returns {String} The converted string.
     */

  }, {
    key: "firstLettersUpper",
    value: function firstLettersUpper(str) {
      return str.replace(/\b[a-z]/g, function (match) {
        return match.toUpperCase();
      });
    }

    /**
     * Converts a string in camelCase.
     * @param   {String} str The string to convert.
     * @returns {String} The converted string.
     */

  }, {
    key: "toCamelCase",
    value: function toCamelCase(str) {
      return str.slice(0, 1).toLowerCase() + Stringlish.firstLettersUpper(str).slice(1).replace(/\s+/g, "");
    }

    /**
     * Converts a string in PascalCase.
     * @param   {String} str The string to convert.
     * @returns {String} The converted string.
     */

  }, {
    key: "toPascalCase",
    value: function toPascalCase(str) {
      return Stringlish.firstLettersUpper(str).replace(/\s+/g, "");
    }

    /**
     * Converts a string in snake_case.
     * @param   {String} str The string to convert.
     * @returns {String} The converted string.
     */

  }, {
    key: "toSnakeCase",
    value: function toSnakeCase(str) {
      return str.toLowerCase().replace(/\s+/g, "_");
    }

    /**
     * Converts a string in kebab-case.
     * @param   {String} str The string to convert.
     * @returns {String} The converted string.
     */

  }, {
    key: "toKebabCase",
    value: function toKebabCase(str) {
      return str.toLowerCase().replace(/\s+/g, "-");
    }

    /**
     * Removes trailing white space from the beginning of a string.
     * @param   {String} str The string to trim.
     * @returns {String} The trimmed string.
     */

  }, {
    key: "trimLeft",
    value: function trimLeft(str) {
      return str.replace(/^\s+/, "");
    }

    /**
     * Removes trailing white space from the end of a string.
     * @param   {String} str The string to trim.
     * @returns {String} The trimmed string.
     */

  }, {
    key: "trimRight",
    value: function trimRight(str) {
      return str.replace(/\s+$/, "");
    }

    /**
     * Removes trailing white space from the beginning and end of a string.
     * @param   {String} str The string to trim.
     * @returns {String} The trimmed string.
     */

  }, {
    key: "trim",
    value: function trim(str) {
      return str.replace(/^\s+|\s+$/g, "");
    }

    /**
     * Cuts a string to the specified length. If the character at the cut location is
     * white space, it's trimmed.
     * @param   {String}  str           The string to cut.
     * @param   {Number}  maxLength     The max string length.
     * @param   {Boolean} ellipsis=true Whether to include an ellipsis on trimmed strings.
     * @returns {String}  The cut string.
     */

  }, {
    key: "cutStr",
    value: function cutStr(str, maxLength) {
      var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      str = str.slice(0, maxLength);

      if (ellipsis && maxLength <= str.length) {
        return Stringlish.trimRight(str.slice(0, -1)).replace(/[^A-Za-z0-9]$/, "") + ELLIPSIS;
      } else {
        return str;
      }
    }

    /**
     * Cuts a string to the specified length, but adjusted accordingly to never split a
     * word. If the character at the cut location is white space, it's trimmed.
     * @param   {String}  str           The string to cut.
     * @param   {Number}  maxLength     The max string length.
     * @param   {Boolean} ellipsis=true Whether to include an ellipsis on trimmed strings.
     * @returns {String}  The cut string.
     */

  }, {
    key: "cutStrAtWords",
    value: function cutStrAtWords(str, maxLength) {
      var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var inRange = maxLength <= str.length;

      str = str.slice(0, maxLength);
      str = Stringlish.trimRight(str.charAt(maxLength - 1) !== " " && inRange ? str.replace(/.\S+$/, "") : str);
      str = str.replace(/[^A-Za-z0-9]$/, "");

      return str + (ellipsis && inRange ? ELLIPSIS : "");
    }

    /**
     * Cuts a string to the specified length from its end to its beginning. If the
     * character at the cut location is white space, it's trimmed.   *
     * @param   {String}  str           The string to cut.
     * @param   {Number}  maxLength     The max string length.
     * @param   {Boolean} ellipsis=true Whether to include an ellipsis on trimmed strings.
     * @returns {String}  The cut string.
     */

  }, {
    key: "cutStrReverse",
    value: function cutStrReverse(str, maxLength) {
      var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var inRange = maxLength <= str.length;

      str = str.length > maxLength ? str.slice(str.length - maxLength) : str;

      if (ellipsis && inRange) {
        return ELLIPSIS + Stringlish.trimLeft(str.slice(1).replace(/^[^A-Za-z0-9]/, ""));
      } else {
        return Stringlish.trimLeft(str);
      }
    }

    /**
     * Cuts a string to the specified length from its end to its beginning, but adjusted
     * accordingly to never split a word. If the character at the cut location is white
     * space, it's trimmed.
     * @param   {String}  str           The string to cut.
     * @param   {Number}  maxLength     The max string length.
     * @param   {Boolean} ellipsis=true Whether to include an ellipsis on trimmed strings.
     * @returns {String}  The cut string.
     */

  }, {
    key: "cutStrAtWordsReverse",
    value: function cutStrAtWordsReverse(str, maxLength) {
      var ellipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var inRange = maxLength <= str.length,
          len = str.length - maxLength,
          pre = "";

      if (maxLength <= str.length) {
        str = str.slice(len);

        if (str.charAt(len) !== " ") {
          str = str.slice(str.indexOf(" "));
        }
      }

      if (ellipsis && inRange) {
        pre = ELLIPSIS;
      }

      return pre + Stringlish.trimLeft(Stringlish.trimLeft(str).replace(/^[^A-Za-z0-9]/, ""));
    }

    /**
     * Counts the number of words in a string.
     * @param   {String} str The string to count.
     * @returns {Number} The word count.
     */

  }, {
    key: "wordCount",
    value: function wordCount(str) {
      return str.replace(/^\s+|\s+$/g, "").match(/\s+/g).length + 1;
    }

    /**
     * Adds an ordinal indicator to a number (i.e. 1st, 2nd, 3rd).
     * @throws  {Error} A number is expected.
     * @param   {Number} num The number to add to.
     * @returns {String} The converted number.
     */

  }, {
    key: "addOrdinalIndicator",
    value: function addOrdinalIndicator(num) {
      if (typeof num !== "number") {
        throw new Error("A number is expected.");
      }

      if (num === 0) {
        return "0";
      }

      var last2Digits = Number(String(num).slice(-2));

      if (last2Digits > 10 && last2Digits < 20) {
        return num + "th";
      }

      var lastDigit = Number(String(num).slice(-1));

      switch (lastDigit) {
        case 1:
          return num + "st";
        case 2:
          return num + "nd";
        case 3:
          return num + "rd";
        default:
          return num + "th";
      }
    }

    /**
     * Converts a number to a readable string (by adding commas). A NaN value is returned as 0.
     * Thanks to stackoverflow.com for the initial regex.
     * @throws	{Error}	 Expects a number.
     * @param   {Number} num The number to convert.
     * @returns {String} A parsed number.
     */

  }, {
    key: "readableNumber",
    value: function readableNumber(num) {
      if (typeof num !== "number") {
        throw new Error("A number is expected.");
      }

      var numStr = String(num),
          stripDecimal = "";

      if (isNaN(num)) {
        return "0";
      }

      if (/\./.test(numStr)) {
        stripDecimal = numStr.replace(/\d+\./, ".");
        numStr = numStr.replace(/\.\d+/, "");
      }

      return numStr.replace(/\d(?=(?:\d{3})+$)/g, "$&,") + stripDecimal;
    }
  }]);

  return Stringlish;
}();

// Support CJS/Node


if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
  module.exports = Stringlish;
}
