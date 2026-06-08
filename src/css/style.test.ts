import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const styleCssPath = fileURLToPath(new URL("./style.css", import.meta.url));

describe("prompt segment CSS", () => {
  it("keeps separator triangles in the prompt stacking flow", () => {
    const css = readFileSync(styleCssPath, "utf8");
    const separatorRule = css.match(/\.prompt-block::after\s*\{(?<body>[^}]*)\}/);

    expect(separatorRule?.groups?.body).toBeDefined();
    expect(separatorRule?.groups?.body).not.toMatch(/z-index\s*:\s*[1-9]/);
  });
});
