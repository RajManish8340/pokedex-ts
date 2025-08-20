// commands.ts
import type { CLICommand } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Type help Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Type exit to Exit the pokedex",
      callback: commandExit,
    },
  };
}
