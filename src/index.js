import { bufferToHex } from "./utils.js";

export class Hmac {
  constructor(algorithm, key) {
    /**
     * @type {string}
     * @private
     */
    this._key = key;
    /**
     * @type {string}
     * @private
     */
    this._algorithm = "";
    /**
     * @see https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HmacImportParams
     */
    switch (algorithm) {
      case "sha256":
        this._algorithm = "SHA-256";
        break;
      case "sha384":
        this._algorithm = "SHA-384";
        break;
      case "sha512":
        this._algorithm = "SHA-512";
        break;
      default:
        throw new Error("Unsupported algorithm");
    }
    /**
     * @type {TextEncoder}
     * @private
     */
    this.encoder = new TextEncoder();
  }

  /**
   * @param {any} data
   * @returns {Hmac}
   */
  update(data) {
    this._data = data;
    return this;
  }

  /**
   * @param {string} encoding
   * @returns {Promise<string>}
   */
  async digest(encoding) {
    if (encoding !== "hex") {
      throw new Error("Only hex encoding is supported");
    }

    /**
     * @type {CryptoKey}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
     */
    const key = await crypto.subtle.importKey(
      "raw",
      this.encoder.encode(this._key),
      {
        name: "HMAC",
        hash: this._algorithm,
      },
      false,
      ["sign"]
    );

    /**
     * @type {ArrayBuffer}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
     */
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      this.encoder.encode(this._data)
    );

    return bufferToHex(signature);
  }
}

/**
 * @param {string} algorithm The algorithm to use. Example: sha256
 * @param {string} key The key to use
 * @param {string} encoding The encoding to use. Default: hex
 * @returns {Hmac}
 */
export function createHmac(algorithm, key, encoding = "hex") {
  return new Hmac(algorithm, key, encoding);
}
