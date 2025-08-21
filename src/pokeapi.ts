export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data as ShallowLocations;
    } catch (error) {
      throw new Error(`Failed to fetch locations: ${error}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data as Location;
    } catch (error) {
      throw new Error(`Failed to fetch location ${locationName}: ${error}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null; // ext: URL for the next page (or null if last page).
  previous: string | null; // previous: URL for the previous page (or null if first page).
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