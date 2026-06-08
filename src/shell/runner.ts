import { BANNER } from "../commands/banner";
import { DEFAULT } from "../commands/default";
import { EXPERIENCE } from "../commands/experience";
import { HELP } from "../commands/help";
import { PROJECTS } from "../commands/projects";
import { createWhoami } from "../commands/whoami";
import { commandToken, type TerminalLine } from "./format";
import type { DeviceInfo, ThemePreference } from "./theme";

export type ShellEffect =
  | { type: "clear" }
  | { type: "theme"; preference: ThemePreference }
  | { type: "open"; url: string }
  | { type: "mailto"; email: string }
  | { type: "passwordPrompt" }
  | { type: "enterBareMode" };

export type CommandRunContext = {
  bareMode: boolean;
  isSudo: boolean;
  username: string;
  repoLink: string;
  email: string;
  deviceInfo: DeviceInfo;
};

export type CommandRunResult = {
  lines: TerminalLine[];
  effect?: ShellEffect;
};

export function runCommand(input: string, context: CommandRunContext): CommandRunResult {
  if(input.startsWith("rm -rf") && input.trim() !== "rm -rf") {
    if (context.isSudo) {
      if(input === "rm -rf src" && !context.bareMode) {
        return { lines: [], effect: { type: "enterBareMode" } };
      }

      if (input === "rm -rf src" && context.bareMode) {
        return { lines: ["there's no more src folder.", "<br>"] };
      }

      if(context.bareMode) {
        return { lines: ["What else are you trying to delete?", "<br>"] };
      }

      return { lines: ["<br>", "Directory not found.", `type ${commandToken("'ls'")} for a list of directories.`, "<br>"] };
    }

    return { lines: ["Permission not granted.", "<br>"] };
  }

  switch(input) {
    case "clear":
      return { lines: [], effect: { type: "clear" } };
    case "dark":
    case "light":
    case "system":
      return {
        lines: [`Theme set to ${commandToken(`'${input}'`)}.`, "<br>"],
        effect: { type: "theme", preference: input },
      };
    case "banner":
      return { lines: context.bareMode ? ["WebShell v1.0.0", "<br>"] : BANNER };
    case "help":
    case "ls":
      return { lines: context.bareMode ? ["maybe restarting your browser will fix this.", "<br>"] : HELP };
    case "whoami":
      return { lines: context.bareMode ? [`${context.username}`, "<br>"] : createWhoami(context.deviceInfo) };
    case "ex":
      return { lines: context.bareMode ? ["Nothing to see here.", "<br>"] : EXPERIENCE };
    case "projects":
      return { lines: context.bareMode ? ["I don't want you to break the other projects.", "<br>"] : PROJECTS };
    case "git":
      return { lines: ["Redirecting to github.com...", "<br>"], effect: { type: "open", url: context.repoLink } };
    case "contact":
      return context.bareMode
        ? { lines: ["No email client survived.", "<br>"] }
        : { lines: ["Opening email client...", "<br>"], effect: { type: "mailto", email: context.email } };
    case "linkedin":
    case "github":
    case "email":
      return { lines: [] };
    case "rm -rf":
      if (context.bareMode) {
        return { lines: ["don't try again.", "<br>"] };
      }

      return {
        lines: context.isSudo ? [`Usage: ${commandToken("'rm -rf &lt;dir&gt;'")}`, "<br>"] : ["Permission not granted.", "<br>"],
      };
    // case "sudo":
    //   return context.bareMode ? { lines: ["no.", "<br>"] } : { lines: [], effect: { type: "passwordPrompt" } };
    default:
      return { lines: context.bareMode ? ["type 'help'", "<br>"] : DEFAULT };
  }
}
