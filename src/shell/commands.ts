import { commandHelpList, commandHelpRow, commandToken, type TerminalLine } from "./format";

export type CommandHelpEntry = {
  names: string[];
  display: string;
  help: string;
};

export const COMMAND_HELP: CommandHelpEntry[] = [
  { names: ["help", "ls"], display: "'help' or 'ls'", help: "List available commands." },
  { names: ["ex"], display: "'ex'", help: "Browse recent experience." },
  { names: ["git"], display: "'git'", help: "Open my GitHub profile." },
  { names: ["dark"], display: "'dark'", help: "Switch to dark mode." },
  { names: ["light"], display: "'light'", help: "Switch to light mode." },
  { names: ["clear"], display: "'clear'", help: "Clear the terminal." },
  { names: ["system"], display: "'system'", help: "Use your system theme." },
  { names: ["banner"], display: "'banner'", help: "Display the banner." },

  { names: ["whoami"], display: "'whoami'", help: "About Hugh + your browser details." },
  { names: ["contact"], display: "'contact'", help: "Start an email." },
  { names: ["projects"], display: "'projects'", help: "Browse selected projects." },
  // { names: ["sudo"], display: "'sudo'", help: "?" },
];

const AUTOCOMPLETE_ORDER = [
  "help",
  "ls",

  "ex",
  "contact",
  "projects",
  "whoami",
  "git",
  "banner",
  "clear",
  "dark",
  "light",
  "system",
];

export function listCommandNames() {
  return [...AUTOCOMPLETE_ORDER];
}

export function autocompleteCommand(input: string) {
  return AUTOCOMPLETE_ORDER.find((command) => command.startsWith(input));
}

export function autocompleteSuffix(input: string) {
  if (input.length === 0) return "";

  const match = autocompleteCommand(input);
  if (!match || match === input) return "";

  return match.slice(input.length);
}

export function isKnownCommand(input: string) {
  const normalizedInput = input.trim().toLowerCase();
  return normalizedInput.length > 0 && AUTOCOMPLETE_ORDER.includes(normalizedInput);
}

export function createHelpLines(): TerminalLine[] {
  return [
    "<br>",
    commandHelpList(COMMAND_HELP.map((entry) => commandHelpRow(commandToken(entry.display), entry.help))),
    "<br>",
    "Press <span class='keys'>[Tab]</span> for auto completion.",
    "Press <span class='keys'>[Esc]</span> to clear the input line.",
    "Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands.",
    "<br>",
  ];
}
