import { describe, expect, it } from "vitest";
import { createHmac } from ".";

describe("Digest algorithms", () => {
  const key = "secret";
  const data = "test string";
  let signature;

  it("sha256 - should equal e014307b469a43de3b233e5d16bf63bf997fa12e026a5d990b9441c258a7b8b6", async () => {
    signature = await createHmac("sha256", key).update(data).digest("hex");

    expect(signature).toBe(
      "e014307b469a43de3b233e5d16bf63bf997fa12e026a5d990b9441c258a7b8b6"
    );
  });

  it("sha384 - should equal e04862d6f9b08267068df225f91e0d2b7748c8c8ed76aff3b6c7a0b3f3f6c75e7d1fe6e98d0d2008e5d31852ec4b1a99", async () => {
    signature = await createHmac("sha384", key).update(data).digest("hex");

    expect(signature).toBe(
      "e04862d6f9b08267068df225f91e0d2b7748c8c8ed76aff3b6c7a0b3f3f6c75e7d1fe6e98d0d2008e5d31852ec4b1a99"
    );
  });

  it("sha512 - should equal 085215495b59a7453925a7f5dfe1a5ed4aec95f9edbcf712130d1b928a077317637f6f39374ec1b6aa63c160e9209e05ec93a9a2a3ca756b76a98765278e2315", async () => {
    signature = await createHmac("sha512", key).update(data).digest("hex");

    expect(signature).toBe(
      "085215495b59a7453925a7f5dfe1a5ed4aec95f9edbcf712130d1b928a077317637f6f39374ec1b6aa63c160e9209e05ec93a9a2a3ca756b76a98765278e2315"
    );
  });
});

describe("Errors", () => {
  it("should throw an error if encoding is not hex", async () => {
    const hmac = createHmac("sha512", "secret").update("test string");

    let error = null;
    try {
      await hmac.digest("notHex");
    } catch (e) {
      error = e.message;
    }

    expect(error).not.toBeNull();
    expect(error).toBe("Only hex encoding is supported");
  });

  it("should throw an error if algorithm is not supported", async () => {
    expect(() => {
      createHmac("notSha", "secret");
    }).toThrowErrorMatchingInlineSnapshot('"Unsupported algorithm"');
  });
});
