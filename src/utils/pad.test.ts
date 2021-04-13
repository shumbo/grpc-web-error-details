import { pad } from "./pad";

describe("pad", () => {
  test("Padded String", () => {
    expect(pad("12345===")).toBe("12345===");
  });
  test("Add 1", () => {
    expect(pad("1234567")).toBe("1234567=");
  });
  test("Add 2", () => {
    expect(pad("123456")).toBe("123456==");
  });
  test("Add 3", () => {
    expect(pad("12345")).toBe("12345===");
  });
});
