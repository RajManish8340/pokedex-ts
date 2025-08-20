// src/command_exit.ts
import type { CLICommand } from "./command.js";
import type { State } from "./state.js";

export const exitCommand: CLICommand = {
  description: "Exit the program",
  callback: (_args, state: State) => {
    console.log("Exiting...");
    state.rl.close(); // close readline interface
    process.exit(0);
  },
};
