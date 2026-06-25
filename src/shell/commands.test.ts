import { describe, expect, it } from "vitest";
import { autocompleteCommand, autocompleteSuffix, createHelpLines, isKnownCommand, listCommandNames } from "./commands";

describe("command registry", () => {
  it("is the source of truth for help rows and autocomplete", () => {
    expect(listCommandNames()).toContain("dark");
    expect(listCommandNames()).toContain("system");
    expect(listCommandNames()).toContain("git");
    expect(listCommandNames()).not.toContain("repo");
    expect(autocompleteCommand("ex")).toBe("ex");
    expect(autocompleteCommand("gi")).toBe("git");
    expect(listCommandNames()).not.toContain("experience");
    expect(listCommandNames()).not.toContain("about");
    expect(isKnownCommand("about")).toBe(false);
    expect(autocompleteCommand("ab")).toBeUndefined();
    expect(isKnownCommand("experience")).toBe(false);
    expect(autocompleteCommand("zzz")).toBeUndefined();
    expect(autocompleteSuffix("")).toBe("");
    expect(autocompleteSuffix("sys")).toBe("tem");
    expect(autocompleteSuffix("dark")).toBe("");
    expect(autocompleteSuffix("zzz")).toBe("");
    expect(isKnownCommand("dark")).toBe(true);
    expect(isKnownCommand("git")).toBe(true);
    expect(isKnownCommand("repo")).toBe(false);
    expect(isKnownCommand(" DARK ")).toBe(true);
    expect(isKnownCommand("dar")).toBe(false);

    expect(createHelpLines().some((line) => line.includes("<span class='command-help-row'><span class='command-help-name'><span class='command'>'dark'</span></span><span class='command-help-description'>Switch to dark mode.</span></span>"))).toBe(true);
    expect(createHelpLines().some((line) => line.includes("<span class='command'>'help' or 'ls'</span></span><span class='command-help-description'>List available commands.</span>"))).toBe(true);
    expect(createHelpLines().some((line) => line.includes("<span class='command'>'whoami'</span></span><span class='command-help-description'>About Hugh + your browser details.</span>"))).toBe(true);
    expect(createHelpLines()).toContain("Press <span class='keys'>[Tab]</span> for auto completion.");
  });
});
