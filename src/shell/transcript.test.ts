import { describe, expect, it, vi } from "vitest";
import { createPromptHistoryEntry, writeTranscriptLines } from "./transcript";

describe("terminal transcript", () => {
  it("renders prompt history and delayed output through one interface", () => {
    const insertedCommands: string[] = [];
    const historyEntry = createPromptHistoryEntry({
      input: "help",
      promptHtml: "<div class=\"prompt-line-bottom\"></div>",
      bareMode: false,
      createElement: () => ({
        className: "",
        innerHTML: "",
        querySelector: () => ({
          insertAdjacentHTML: (_position, html) => insertedCommands.push(html),
        }),
      }),
    });

    expect(historyEntry.className).toBe("prompt-entry prompt-history");
    expect(historyEntry.innerHTML).toBe("<div class=\"shell-prompt\"><div class=\"prompt-line-bottom\"></div></div>");
    expect(insertedCommands).toEqual(["<span class=\"history-command\"><span class='output'>help</span></span>"]);

    const insertedLines: string[] = [];
    const scrollToBottom = vi.fn();
    writeTranscriptLines(["one", "two"], {
      target: "write-lines",
      createParagraph: () => ({ innerHTML: "" }),
      insertBefore: (paragraph) => insertedLines.push(paragraph.innerHTML),
      scrollToBottom,
      setTimer: (callback) => {
        callback();
        return 0;
      },
    });

    expect(insertedLines).toEqual(["one", "two"]);
    expect(scrollToBottom).toHaveBeenCalledTimes(2);
  });
});
