import { describe, expect, it } from "vitest";
import command from "../../config.json" assert { type: "json" };
import { BANNER } from "./banner";
import { DEFAULT } from "./default";
import { EXPERIENCE } from "./experience";
import { PROJECTS } from "./projects";
import { createWhoami } from "./whoami";

describe("command content", () => {
  it("keeps visible terminal output conventions for configured content", () => {
    expect(BANNER.some((line) => line.startsWith("<pre"))).toBe(true);
    expect(BANNER.some((line) => line.includes("<span class='banner-link-full'>github/HughScott2002</span><span class='banner-link-compact'>github</span>"))).toBe(true);
    expect(BANNER.some((line) => line.includes("<span class='banner-link-full'>www.linkedin.com/in/hugh-scott-3912421a5/</span><span class='banner-link-compact'>linkedin</span>"))).toBe(true);
    expect(BANNER.some((line) => line.includes("<span class='command-hint-commands'><span class='command'>'dark'</span>, <span class='command'>'light'</span>, or <span class='command'>'system'</span></span>"))).toBe(true);
    expect(BANNER.some((line) => line.includes("to view my GitHub or click <a target='_blank'"))).toBe(true);
    expect(BANNER.some((line) => line.includes("<span class='command'>'git'</span>"))).toBe(true);
    expect(BANNER.some((line) => line.includes("<span class='command'>'repo'</span>"))).toBe(false);
    expect(PROJECTS).toContain(`<span class='terminal-count'>${command.projects.length}</span> File(s)`);
    expect(EXPERIENCE).toContain(`<span class='terminal-count'>${command.experience.length}</span> File(s)`);
    expect(DEFAULT).toContain("Type <span class='command'>'help'</span> to get started.");

    const whoami = createWhoami({
      device: "mac",
      theme: "dark",
      resolvedTheme: "dark",
      language: "en-US",
      timezone: "America/Bogota",
      screen: "1440x900",
      cpuThreads: "8 threads",
      memory: "not shared",
      online: "online",
    });

    expect(whoami).toContain("Whoami? I'm Hugh Scott.");
    expect(whoami).toContain("I love building software and making music.");
    expect(whoami).toContain("My long-term goal is to build a unicorn startup from Jamaica.");
    expect(whoami).toContain("But enough about me...");
    expect(whoami).toContain("\n\nPlot twist: this terminal runs on your side.");
    expect(whoami).toContain("So here's what your browser says:");
    expect(whoami).toContain("&nbsp;&nbsp;<span class='command'>theme</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='terminal-metric-value'>dark (dark)</span>");
  });
});
