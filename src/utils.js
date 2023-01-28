/**
 * Convert an ArrayBuffer to a hex string
 * @author https://stackoverflow.com/a/50767210/19456595
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
export function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
