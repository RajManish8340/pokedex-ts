// src/repl.ts
import { cleanInput } from "./cleanInput.js";
import type { State } from "./state.js";

export function repl(state: State) {
  state.rl.setPrompt("Pokedex > ");
  state.rl.prompt();

  state.rl.on("line", (line) => {
    const [commandName, ...args] = cleanInput(line);
    const command = state.commands[commandName];

    if (command) {
      command.callback(args, state);
    } else {
      console.log(`Unknown command: ${commandName}`);
    }

    state.rl.prompt();
  });
}
