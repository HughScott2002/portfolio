import { describe, expect, it } from "vitest";
import { autocompleteCommand, autocompleteSuffix, createHelpLines, isKnownCommand, listCommandNames } from "./commands";

describe("command registry", () => {
  it("is the source of truth for help rows and autocomplete", () => {
    expect(listCommandNames()).toContain("dark");
    expect(listCommandNames()).toContain("system");
    expect(autocompleteCommand("ex")).toBe("experience");
    expect(autocompleteCommand("zzz")).toBeUndefined();
    expect(autocompleteSuffix("")).toBe("");
    expect(autocompleteSuffix("sys")).toBe("tem");
    expect(autocompleteSuffix("dark")).toBe("");
    expect(autocompleteSuffix("zzz")).toBe("");
    expect(isKnownCommand("dark")).toBe(true);
    expect(isKnownCommand(" DARK ")).toBe(true);
    expect(isKnownCommand("dar")).toBe(false);

    expect(createHelpLines()).toContain("&nbsp;&nbsp;<span class='command'>'dark'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Switch to dark mode.");
    expect(createHelpLines()).toContain("Press <span class='keys'>[Tab]</span> for auto completion.");
  });
});
