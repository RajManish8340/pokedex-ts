import type { CLICommand } from "./command.js";
import type { State } from "./state.js";
import type { Pokemon as ApiPokemon } from "./pokeapi.js";

export const catchCommand: CLICommand = {
  description: "Attempt to catch a Pokemon",
  callback: async (state: State, ...args: string[]) => {
    if (args.length === 0) {
      console.log("Please specify a Pokemon to catch");
      console.log("Usage: catch <pokemon-name>");
      return;
    }

    const pokemonName = args[0].toLowerCase();
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    // Check if already caught
    if (state.pokedex[pokemonName]) {
      console.log(`You already caught ${pokemonName}!`);
      return;
    }

    try {
      // Fetch Pokemon data from API
      const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
      
      // More realistic catch probability like in the cartoons/games
      // Base experience affects catch rate significantly
      // Legendary/rare Pokemon are much harder to catch
      let catchProbability: number;
      
      if (pokemon.base_experience <= 50) {
        // Very common, weak Pokemon (like Caterpie, Weedle)
        catchProbability = 0.7; // 70% chance
      } else if (pokemon.base_experience <= 100) {
        // Common Pokemon (like Pidgey, Rattata)
        catchProbability = 0.5; // 50% chance
      } else if (pokemon.base_experience <= 200) {
        // Uncommon Pokemon (like Pikachu, Squirtle)
        catchProbability = 0.3; // 30% chance
      } else if (pokemon.base_experience <= 300) {
        // Rare Pokemon (like Dragonite, Tyranitar)
        catchProbability = 0.15; // 15% chance
      } else {
        // Legendary/very rare Pokemon (like Mewtwo, Rayquaza)
        catchProbability = 0.05; // 5% chance
      }

      // Add some randomness to make it feel more like the cartoons
      // where even common Pokemon can sometimes be tricky
      const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
      catchProbability *= randomFactor;

      const isCaught = Math.random() < catchProbability;

      if (isCaught) {
        // Add to pokedex with all the details
        state.pokedex[pokemonName] = {
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          base_experience: pokemon.base_experience,
          stats: pokemon.stats,
          types: pokemon.types,
        };
        console.log(`${pokemonName} was caught!`);
        console.log(`Added ${pokemonName} to your Pokedex!`);
      } else {
        console.log(`${pokemonName} escaped!`);
        console.log(`The Pokeball shook ${Math.floor(Math.random() * 3) + 1} times before it broke open!`);
      }
    } catch (error) {
      console.error(`Error trying to catch ${pokemonName}:`, error);
      console.log("Make sure you entered a valid Pokemon name");
    }
  },
};