import type { CLICommand } from "./command.js";
import type { State } from "./state.js";

export const exploreCommand: CLICommand = {
  description: "Explore a location area to find Pokemon",
  callback: async (state: State, ...args: string[]) => {
    if (args.length === 0) {
      console.log("Please specify a location area to explore");
      console.log("Usage: explore <location-area-name>");
      return;
    }

    const locationName = args[0];
    console.log(`Exploring ${locationName}...`);

    try {
      const location = await state.pokeAPI.fetchLocation(locationName);
      
      console.log("Found Pokemon:");
      for (const encounter of location.pokemon_encounters) {
        console.log(`- ${encounter.pokemon.name}`);
      }
    } catch (error) {
      console.error(`Error exploring ${locationName}:`, error);
      console.log("Make sure you entered a valid location area name");
    }
  },
};