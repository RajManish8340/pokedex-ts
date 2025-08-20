// src/main.ts
import { initState } from "./state.js";
import { repl } from "./repl.js";

function main() {
  const state = initState();
  repl(state);
}

main();
