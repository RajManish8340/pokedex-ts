import { createInterface, type Interface } from "readline";
import { CLICommand } from "./command.js";
import { commands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>; // Add pokedex to store caught Pokemon
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
    pokedex: {}, // Initialize empty pokedex
  };
}