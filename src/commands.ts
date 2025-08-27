import type { CLICommand } from "./command.js";
import { catchCommand } from "./command_catch.js";
import { exitCommand } from "./command_exit.js";
import { exploreCommand } from "./command_explore.js";
import { helpCommand } from "./command_help.js";
import { inspectCommand } from "./command_inspect.js";
import { areaNamesCommand, areaNamesPrevCommand } from "./command_map.js";
import { pokedexCommand } from "./command_pokedex.js";

export const commands: Record<string, CLICommand> = {
  help: helpCommand,
  exit: exitCommand,
  map: areaNamesCommand,
  mapb: areaNamesPrevCommand,
  explore: exploreCommand,
  catch: catchCommand,
  inspect: inspectCommand,
  pokedex: pokedexCommand
};
