import { cleanInput } from "./repl";
import { describe, expect ,test } from "vitest";

describe.each([
  {
    input: "  charmander  bulbasaur  ",
    expected: ["charmander", "bulbasaur"],
  },
  {
    input: " Charmander Bulbasaur PIKACHU",
    expected: ["charmander","bulbasaur","pikachu"],
  },
  {
    input: "",
    expected: "please enter the valid names",
  },
  {
    input: "       ",
    expected: "please enter the valid names"
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input)

    // The `expect` and `toHaveLength` functions are from vitest
    // they will fail the test if the condition is not met
    if(typeof expected === "string") {
        expect(actual).toBe(expected)
    } else{
        expect(actual).toHaveLength(expected.length)
    for (let i = 0; i < expected.length; i++) {
    expect(actual[i]).toBe(expected[i])
    }
    }
  });
});
