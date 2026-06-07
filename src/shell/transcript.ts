import type { TerminalLine } from "./format";

type PromptHistoryElement = {
  className: string;
  innerHTML: string;
  querySelector(selector: string): { insertAdjacentHTML(position: "beforeend", html: string): void } | null;
};

type ParagraphElement = {
  className?: string;
  innerHTML: string;
};

export function createPromptHistoryEntry<TElement extends PromptHistoryElement>(options: {
  input: string;
  promptHtml: string;
  bareMode: boolean;
  createElement: () => TElement;
}): TElement {
  const historyInput = options.bareMode ? options.input : `<span class='output'>${options.input}</span>`;
  const entry = options.createElement();
  entry.className = "prompt-entry prompt-history";
  entry.innerHTML = `<div class="shell-prompt">${options.promptHtml}</div>`;
  entry
    .querySelector(".prompt-line-bottom")
    ?.insertAdjacentHTML("beforeend", `<span class="history-command">${historyInput}</span>`);

  return entry;
}

export function writeTranscriptLines<TTarget, TParagraph extends ParagraphElement>(
  message: TerminalLine[],
  options: {
    target: TTarget;
    createParagraph: () => TParagraph;
    insertBefore: (paragraph: TParagraph, target: TTarget) => void;
    scrollToBottom: () => void;
    setTimer?: (callback: () => void, delay: number) => unknown;
    delayMs?: number;
  },
) {
  const setTimer = options.setTimer ?? setTimeout;
  const delayMs = options.delayMs ?? 40;

  message.forEach((item, idx) => {
    const insertLine = () => {
      const paragraph = options.createParagraph();
      paragraph.className = "terminal-line";
      paragraph.innerHTML = item;
      options.insertBefore(paragraph, options.target);
      options.scrollToBottom();
    };

    if (delayMs <= 0) {
      insertLine();
      return;
    }

    setTimer(insertLine, delayMs * idx);
  });
}
