import readline from "node:readline";
import { cleanInput } from "./cleanInput.js";
import { getCommands } from "./commands.js";

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();
  rl.prompt();

  rl.on("line", (line: string) => {
    const cleaned = cleanInput(line);

    if (cleaned.length === 0) {
      rl.prompt();
      return;
    }

    const [commandName] = cleaned;
    const command = commands[commandName];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      command.callback(commands);
    } catch (err) {
      console.error("Error executing command:", err);
    }

    rl.prompt();
  });
}
