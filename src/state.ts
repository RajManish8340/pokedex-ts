import { createInterface, type Interface } from "readline";
import { CLICommand } from "./command.js";
import { commands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    rl,
    commands,
    pokeAPI: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}