import readline from "node:readline"
import { cleanInput } from "./cleanInput.js"


export function startREPL() {
  // Create an interface for reading input
  const rl = readline.createInterface({
    input: process.stdin,   // readable stream
    output: process.stdout, // writable stream
    prompt: "Pokedex > ",   // prompt string
  })

  // Display initial prompt
  rl.prompt()

  // When a line of input is entered
  rl.on("line", (line: string) => {
    const cleaned = cleanInput(line)

    if (typeof cleaned === "string" || cleaned.length === 0) {
      // Invalid or empty input
      console.log(cleaned)
      rl.prompt()
      return
    }

    // Print the first command word
    console.log(`Your command was: ${cleaned[0]}`)

    // Show prompt again
    rl.prompt()
  })

  // Handle ctrl+c or exit
  rl.on("close", () => {
    console.log("Goodbye!")
    process.exit(0)
  })
}