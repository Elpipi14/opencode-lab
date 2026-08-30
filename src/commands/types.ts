import type { ContentStatus } from "../data/types";

export interface OutputDetail {
  label: string;
  value: string;
}

export interface OutputItem {
  title: string;
  status?: ContentStatus;
  paragraphs?: readonly string[];
  details?: readonly OutputDetail[];
}

export interface OutputSection {
  title?: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
  items?: readonly OutputItem[];
}

export interface CommandOutput {
  title: string;
  status?: ContentStatus;
  paragraphs?: readonly string[];
  sections?: readonly OutputSection[];
}

export type CommandResult =
  | { type: "output"; output: CommandOutput }
  | { type: "clear" };

export interface CommandContext {
  history: readonly string[];
}

export interface CommandDefinition {
  name: string;
  description: string;
  execute: (context: CommandContext) => CommandResult;
}

export interface TerminalEntry {
  id: number;
  command: string;
  output: CommandOutput;
}
