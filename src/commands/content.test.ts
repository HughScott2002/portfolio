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
    expect(BANNER.some((line) => line.includes("<span class='banner-link-full'>github/HughScott2002</span>"))).toBe(true);
    expect(BANNER.some((line) => line.includes("<span class='banner-link-full'>www.linkedin.com/in/hugh-scott-3912421a5/</span>"))).toBe(true);
    expect(BANNER.some((line) => line.includes("<span class='banner-link-full'>huggingface.co/HughScott</span>"))).toBe(true);
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

    expect(whoami.join("\n")).toContain("Software Engineer · Mandeville, Jamaica");
    expect(whoami.join("\n")).toContain("TypeScript · Go · Rust");
    expect(whoami).toContain("I make music.");
    expect(whoami.join("\n")).toContain("Here's some stuff I know about you.");
    expect(whoami).toContain("<span class='terminal-detail-row' style='--detail-label-width: 7rem'><span class='terminal-detail-label'><span class='command'>theme</span></span><span class='terminal-detail-value'><span class='terminal-metric-value'>dark (dark)</span></span></span>");
  });
});
