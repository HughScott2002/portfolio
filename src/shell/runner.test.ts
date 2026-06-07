import { describe, expect, it } from "vitest";
import { runCommand } from "./runner";

const context = {
  bareMode: false,
  isSudo: false,
  username: "hugh",
  repoLink: "https://github.com/HughScott2002",
  email: "hugh@example.com",
  deviceInfo: {
    device: "mac",
    theme: "dark",
    resolvedTheme: "dark",
    language: "en-US",
    timezone: "America/Bogota",
    screen: "1440x900",
    cpuThreads: "8 threads",
    memory: "not shared",
    online: "online",
  },
};

describe("command runner", () => {
  it("maps terminal commands to output lines and shell effects", () => {
    expect(runCommand("dark", context)).toEqual({
      lines: ["Theme set to <span class='command'>'dark'</span>.", "<br>"],
      effect: { type: "theme", preference: "dark" },
    });

    expect(runCommand("ls", context).lines).toContain("Press <span class='keys'>[Tab]</span> for auto completion.");
    expect(runCommand("rm -rf src", context).lines).toEqual(["Permission not granted.", "<br>"]);
    expect(runCommand("rm -rf src", { ...context, isSudo: true })).toEqual({
      lines: [],
      effect: { type: "enterBareMode" },
    });
    expect(runCommand("git", context)).toEqual({
      lines: ["Redirecting to github.com...", "<br>"],
      effect: { type: "open", url: context.repoLink },
    });
    expect(runCommand("whatever", { ...context, bareMode: true }).lines).toEqual(["type 'help'", "<br>"]);
  });
});
