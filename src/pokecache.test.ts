import { describe, it, expect } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  it("stores and retrieves values", () => {
    const cache = new Cache(1000); // 1 second expiry
    cache.add("test", 123);

    const result = cache.get<number>("test");
    expect(result).toBe(123);
  });

  it("expires values after interval", async () => {
    const cache = new Cache(100); // 100ms expiry
    cache.add("test", 456);

    await new Promise((r) => setTimeout(r, 200));

    const result = cache.get<number>("test");
    expect(result).toBeUndefined();
  });
});
