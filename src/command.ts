import type { State } from "./state.js";

export type CLICommand = {
  description: string;
  // Flexible callback signature: can accept args and state
  callback: (state: State, ...args: string[]) => Promise<void>;
};