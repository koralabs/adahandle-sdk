/**
 * Checks if a given string is hex encoded.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} - Returns `true` if the string is hex encoded, otherwise `false`.
 * @example
 *
 * isHex("1a2b3c");  // returns true
 * isHex("1a2b3z");  // returns false
 * isHex("1a2b3");   // returns false due to odd length
 */
export const isHex = (str: string): boolean => {
    const hexRegex = /^[0-9a-fA-F]+$/;
    return str.length % 2 === 0 && hexRegex.test(str);
};
