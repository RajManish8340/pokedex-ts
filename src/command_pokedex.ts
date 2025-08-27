import type { CLICommand } from "./command.js";
import type { State } from "./state.js";

export const pokedexCommand: CLICommand = {
  description: "List all Pokemon you've caught",
  callback: async (state: State) => {
    const caughtPokemon = Object.keys(state.pokedex);
    
    if (caughtPokemon.length === 0) {
      console.log("Your Pokedex is empty. Go catch some Pokemon!");
      return;
    }
    
    console.log("Your Pokedex:");
    for (const pokemon of caughtPokemon) {
      console.log(` - ${pokemon}`);
    }
  },
};