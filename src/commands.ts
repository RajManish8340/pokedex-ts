// src/commands.ts
import type { CLICommand } from "./command.js";
import { exitCommand } from "./command_exit.js";
import { helpCommand } from "./command_help.js";

export const commands: Record<string, CLICommand> = {
  help: helpCommand,
  exit: exitCommand,
  // Add more commands here...
};
