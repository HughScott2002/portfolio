import { describe, expect, it } from "vitest";
import { ABOUT } from "./about";
import { BANNER } from "./banner";
import { DEFAULT } from "./default";
import { EXPERIENCE } from "./experience";
import { PROJECTS } from "./projects";
import { createWhoami } from "./whoami";

describe("command content", () => {
  it("keeps visible terminal output conventions for configured content", () => {
    expect(BANNER.some((line) => line.startsWith("<pre>"))).toBe(true);
    expect(BANNER).toContain("Type <span class='command'>'dark'</span>, <span class='command'>'light'</span>, or <span class='command'>'system'</span> to change the theme.");
    expect(ABOUT.some((line) => line.includes("mailto:"))).toBe(true);
    expect(PROJECTS).toContain("2 File(s)");
    expect(EXPERIENCE).toContain("2 File(s)");
    expect(DEFAULT).toContain("Type <span class='command'>'help'</span> to get started.");

    expect(createWhoami({
      device: "mac",
      theme: "dark",
      resolvedTheme: "dark",
      language: "en-US",
      timezone: "America/Bogota",
      screen: "1440x900",
      cpuThreads: "8 threads",
      memory: "not shared",
      online: "online",
    })).toContain("&nbsp;&nbsp;<span class='command'>theme</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dark (dark)");
  });
});
