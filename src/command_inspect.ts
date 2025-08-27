import type { CLICommand } from "./command.js";
import type { State } from "./state.js";

export const inspectCommand: CLICommand = {
  description: "Inspect a Pokemon you've caught",
  callback: async (state: State, ...args: string[]) => {
    if (args.length === 0) {
      console.log("Please specify a Pokemon to inspect");
      console.log("Usage: inspect <pokemon-name>");
      return;
    }

    const pokemonName = args[0].toLowerCase();
    const pokemon = state.pokedex[pokemonName];

    if (!pokemon) {
      console.log("you have not caught that pokemon");
      return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    
    console.log("Stats:");
    for (const stat of pokemon.stats) {
      const statName = stat.stat.name.replace('-', ' ');
      console.log(`  -${statName}: ${stat.base_stat}`);
    }
    
    console.log("Types:");
    for (const type of pokemon.types) {
      console.log(`  - ${type.type.name}`);
    }
  },
};