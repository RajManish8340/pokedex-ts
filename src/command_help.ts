import type { CLICommand } from "./command.js";
import type { State } from "./state.js";

export const helpCommand: CLICommand = {
  description: "Show available commands",
  callback: async (state: State) => {
    console.log("Available commands:");
    for (const [name, cmd] of Object.entries(state.commands)) {
      console.log(`- ${name}: ${cmd.description}`);
    }
  },
};
