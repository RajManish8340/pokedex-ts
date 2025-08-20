// src/state.ts
import { createInterface, type Interface } from "readline";
import { CLICommand } from "./command.js";
import { commands } from "./commands.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    rl,
    commands,
  };
}
