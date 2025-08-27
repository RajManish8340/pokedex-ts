import type { CLICommand } from "./command.js";
import { exitCommand } from "./command_exit.js";
import { exploreCommand } from "./command_explore.js";
import { helpCommand } from "./command_help.js";
import { areaNamesCommand, areaNamesPrevCommand } from "./command_map.js";

export const commands: Record<string, CLICommand> = {
  help: helpCommand,
  exit: exitCommand,
  map: areaNamesCommand,
  mapb: areaNamesPrevCommand,
  explore: exploreCommand,
};
