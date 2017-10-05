/**
 * @author Leandro Silva
 * @copyright 2014, 2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 */

// jshint esversion: 6, node: true

const ELLIPSIS = "\u2026";

/**
 * @classdesc This class helps parse, format, and transform strings. It supports
 *            both Node and browser use.
 */
class Stringlish {
  /**
   * Converts the first letter of a string to uppercase.
   * @param   {String} str The string to convert.
   * @returns {String} The converted string.
   */
  static firstLetterUpper(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  /**
   * Converts the first letter of every word to uppercase.
   * @param   {String} str The string to convert.
   * @returns {String} The converted string.
   */
  static firstLettersUpper(str) {
    return str.replace(/\b[a-z]/g, match => match.toUpperCase());
  }

  /**
   * Converts a string in camelCase.
   * @param   {String} str The string to convert.
   * @returns {String} The converted string.
   */
  static toCamelCase(str) {
    return str.slice(0, 1).toLowerCase() + Stringlish.firstLettersUpper(str).slice(1).replace(/\s+/g, "");
  }

  /**
   * Converts a string in PascalCase.
   * @param   {String} str The string to convert.
   * @returns {String} The converted string.
   */
  static toPascalCase(str) {
    return Stringlish.firstLettersUpper(str).replace(/\s+/g, "");
  }

  /**
   * Converts a string in snake_case.
   * @param   {String} str The string to convert.
   * @returns {String} The converted string.
   */
  static toSnakeCase(str) {
    return str.toLowerCase().replace(/\s+/g, "_");
  }

  /**
   * Converts a string in kebab-case.
   * @param   {String} str The string to convert.
   * @returns {String} The converted string.
   */
  static toKebabCase(str) {
    return str.toLowerCase().replace(/\s+/g, "-");
  }

  /**
   * Removes trailing white space from the beginning of a string.
   * @param   {String} str The string to trim.
   * @returns {String} The trimmed string.
   */
  static trimLeft(str) {
    return str.replace(/^\s+/, "");
  }

  /**
   * Removes trailing white space from the end of a string.
   * @param   {String} str The string to trim.
   * @returns {String} The trimmed string.
   */
  static trimRight(str) {
    return str.replace(/\s+$/, "");
  }

  /**
   * Removes trailing white space from the beginning and end of a string.
   * @param   {String} str The string to trim.
   * @returns {String} The trimmed string.
   */
  static trim(str) {
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
  static cutStr(str, maxLength, ellipsis = true) {
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
  static cutStrAtWords(str, maxLength, ellipsis = true) {
    let inRange = (maxLength <= str.length);

    str = str.slice(0, maxLength);
    str = Stringlish.trimRight((str.charAt(maxLength - 1) !== " " && inRange) ? str.replace(/.\S+$/, "") : str);
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
  static cutStrReverse(str, maxLength, ellipsis = true) {
    let inRange = (maxLength <= str.length);

    str = (str.length > maxLength ? str.slice(str.length - maxLength) : str);

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
  static cutStrAtWordsReverse(str, maxLength, ellipsis = true) {
    let inRange = (maxLength <= str.length),
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
  static wordCount(str) {
    return str.replace(/^\s+|\s+$/g, "").match(/\s+/g).length + 1;
  }

  /**
   * Adds an ordinal indicator to a number (i.e. 1st, 2nd, 3rd).
   * @throws  {Error} A number is expected.
   * @param   {Number} num The number to add to.
   * @returns {String} The converted number.
   */
  static addOrdinalIndicator(num) {
    if (typeof num !== "number") {
      throw new Error("A number is expected.");
    }

    if (num === 0) {
      return "0";
    }

    let last2Digits = Number(String(num).slice(-2));

    if (last2Digits > 10 && last2Digits < 20) {
      return num + "th";
    }

    let lastDigit = Number(String(num).slice(-1));

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
   * Parses a string as a mathematical equation. Supports addition, subtraction, division,
   * and multiplication.
   * @throws	{Error} Spaces and letters are not allowed.
   * @throws	{Error} Your string has two consecutive operators.
   * @param   {String} str The string to parse.
   * @returns {Number} The end value.
   */
  static parseMath(str) {
    if (/[A-Za-z\s]/.test(str)) {
      throw new Error("Spaces and letters are not allowed.");
    }

    if (/[+\-*\/]{3,}/.test(str)) {
      throw new Error("Your string has two consecutive operators.");
    }

    if (/[\\*+-]$|^[\\*+]/.test(str)) {
      throw new Error("Your string is malformed.");
    }

    // Do math inside parentheses first
    while (/\(/.test(str)) {
      let nested = str.match(/\(([^(]+?)\)/)[1];

      str = str.replace(`(${nested})`, Stringlish.parseMath(nested));
    }

    // Division and multiplication operators are done first
    while (/\/|\*/.test(str)) {
      str = str.replace(/(-?\d+)([/*])(-?\d+)/, Stringlish._doMath);
    }

    while (/(?!^-)-|\+/.test(str)) {
      str = str.replace(/(-?\d+)([+-])(-?\d+)/, Stringlish._doMath);
    }

    return str;
  }

  /**
   * Performs math for the parseMath method.
   * @private
   * @param   {String} match    The matched string.
   * @param   {Number} num1     The first number of the equation.
   * @param   {String} operator The operator.
   * @param   {Number} num2     The second number of the equation.
   * @returns {Number} The end total.
   */
  static _doMath(match, num1, operator, num2) {
    switch (operator) {
      case "/":
        return Number(num1) / Number(num2);
      case "*":
        return Number(num1) * Number(num2);
      case "+":
        return Number(num1) + Number(num2);
      case "-":
        return Number(num1) - Number(num2);
    }
  }

  /**
   * Converts a number to a readable string (by adding commas). A NaN value is returned as 0.
   * Thanks to stackoverflow.com for the initial regex.
   * @throws	{Error}	 Expects a number.
   * @param   {Number} num The number to convert.
   * @returns {String} A parsed number.
   */
  static readableNumber(num) {
    if (typeof num !== "number") {
      throw new Error("A number is expected.");
    }

    let numStr = String(num),
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

}

//Support CJS/Node
if (typeof module === "object" && module.exports) {
  module.exports = Stringlish;
}
