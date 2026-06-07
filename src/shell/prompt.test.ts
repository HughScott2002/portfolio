import { describe, expect, it } from "vitest";
import { createPromptHtml } from "./prompt";

describe("prompt UI", () => {
  it("generates shared static and active prompt markup", () => {
    const staticPrompt = createPromptHtml();
    const activePrompt = createPromptHtml({ active: true });

    expect(staticPrompt).toContain("prompt-block prompt-logo-block");
    expect(staticPrompt).toContain("prompt-block prompt-path\">~/portfolio</span>");
    expect(staticPrompt).not.toContain("id=\"user-input\"");

    expect(activePrompt).toContain("command-input-wrap");
    expect(activePrompt).toContain("id=\"command-input-mirror\"");
    expect(activePrompt).toContain("id=\"command-input-suggestion\"");
    expect(activePrompt).toContain("id=\"user-input\"");
  });
});
