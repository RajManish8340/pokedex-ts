import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(interval: number = 150_000) {
    // cache entries expire after 150 seconds by default
    this.cache = new Cache(interval);
  }

  private async fetchWithCache<T>(url: string): Promise<T> {
    // check cache
    const cached = this.cache.get<T>(url);
    if (cached) {
      console.log(`[CACHE HIT] fetching from [Cached] url: ${url}`);
      return cached;
    }

    // fetch from API if not cached
    console.log(`[CACHE MISS] fetching from url: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as T;

    // store in cache
    this.cache.add(url, data);

    return data;
  }

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    try {
      return await this.fetchWithCache<ShallowLocations>(url);
    } catch (error) {
      throw new Error(`Failed to fetch locations: ${error}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      return await this.fetchWithCache<Location>(url);
    } catch (error) {
      throw new Error(`Failed to fetch location ${locationName}: ${error}`);
    }
  }

  async fetchPokemon(pokemonName:string) : Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`
    try{
      return await this.fetchWithCache<Pokemon>(url)
    } catch(error) {
      throw new Error (`Failed to fetch pokemon : ${pokemonName}: ${error}`)
    }
  }
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
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
export type ShallowLocations = {
  count: number;
  next: string | null; // URL for the next page (or null if last page).
  previous: string | null; // URL for the previous page (or null if first page).
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<{
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<{
      version: {
        name: string;
        url: string;
      };
      max_chance: number;
      encounter_details: Array<{
        min_level: number;
        max_level: number;
        condition_values: Array<any>;
        chance: number;
        method: {
          name: string;
          url: string;
        };
      }>; 
    }>;
  }>;
};
