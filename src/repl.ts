
import { cleanInput } from "./cleanInput.js";
import type { State } from "./state.js";

export function repl(state: State) {
  // ANSI color codes
  const reset = "\x1b[0m";
  const green = "\x1b[32m";
  const blue = "\x1b[34m";
  const bold = "\x1b[1m";
  
  // Colorful prompt
  const prompt = `${green}${bold}Pokedex${reset}${blue} > ${reset}`;
  
  state.rl.setPrompt(prompt);
  state.rl.prompt();

  state.rl.on("line", async (line) => {
    const cleanedInput = cleanInput(line);
    
    // Handle empty input or error message
    //  cleaned input will onlyy return just string only if the command is empty
    if (typeof cleanedInput === "string") {
      console.log(cleanedInput); 
      state.rl.prompt();
      return;
    }

    const [commandName, ...args] = cleanedInput;
    const command = state.commands[commandName];

    if (command) {
      try {
        await command.callback(state, ...args);
      } catch (error) {
        console.error("Error executing command:", error);
      }
      // handles unknown command
    } else {
      console.log(`Unknown command: ${commandName}`);
    }

    // Use setImmediate to ensure all async output is flushed before showing prompt
    setImmediate(() => {
      state.rl.prompt();
    });
  });
}