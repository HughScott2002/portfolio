import { commandHelpList, commandHelpRow, commandToken, type TerminalLine } from "./format";

export type CommandHelpEntry = {
  names: string[];
  display: string;
  help: string;
};

export const COMMAND_HELP: CommandHelpEntry[] = [
  { names: ["about"], display: "'about'", help: "Who made this website?" },
  { names: ["ex"], display: "'ex'", help: "Where has Hugh worked?" },
  { names: ["contact"], display: "'contact'", help: "Start an email to Hugh." },
  { names: ["projects"], display: "'projects'", help: "Maybe there's something interesting." },
  { names: ["ls"], display: "'ls'", help: "List available commands." },
  { names: ["whoami"], display: "'whoami'", help: "A perplexing question." },
  { names: ["sudo"], display: "'sudo'", help: "???" },
  { names: ["repo"], display: "'repo'", help: "View the Github Repository." },
  { names: ["banner"], display: "'banner'", help: "Display the banner." },
  { names: ["clear"], display: "'clear'", help: "Clear the terminal." },
  { names: ["dark"], display: "'dark'", help: "Switch to dark mode." },
  { names: ["light"], display: "'light'", help: "Switch to light mode." },
  { names: ["system"], display: "'system'", help: "Use your system theme." },
];

const AUTOCOMPLETE_ORDER = [
  "help",
  "ls",
  "about",
  "ex",
  "contact",
  "projects",
  "whoami",
  "repo",
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
