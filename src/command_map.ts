import { CLICommand } from "./command.js";
import { State } from "./state.js";

export const areaNamesCommand: CLICommand = {
    description: "displays the names of 20 location areas in the Pokemon world",
    callback: async (_args, state: State) => {
        try {
            const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
            
            // Display the location names
            for (const location of locations.results) {
                console.log(location.name);
            }
            
            // Update the URLs for pagination
            state.nextLocationsURL = locations.next;
            state.prevLocationsURL = locations.previous;
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    }
}

export const areaNamesPrevCommand: CLICommand = {
    description: "displays the previous 20 location areas in the Pokemon world",
    callback: async (_args, state: State) => {
        if (!state.prevLocationsURL) {
            console.log("you're on the first page");
            return;
        }
        
        try {
            const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
            
            // Display the location names
            for (const location of locations.results) {
                console.log(location.name);
            }
            
            // Update the URLs for pagination
            state.nextLocationsURL = locations.next;
            state.prevLocationsURL = locations.previous;
        } catch (error) {
            console.error("Error fetching previous locations:", error);
        }
    }
}