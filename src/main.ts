import command from '../config.json' assert {type: 'json'};
import { autocompleteCommand, autocompleteSuffix, isKnownCommand } from "./shell/commands";
import { createInitialShellMode, enterBareMode, enterPasswordMode, exitPasswordMode, submitPassword } from "./shell/mode";
import { renderPromptUi } from "./shell/prompt";
import { runCommand, type ShellEffect } from "./shell/runner";
import { applyBrowserTheme, getBrowserDeviceInfo, getStoredThemePreference, type ThemePreference } from "./shell/theme";
import { createPromptHistoryEntry, writeTranscriptLines } from "./shell/transcript";

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let shellMode = createInitialShellMode();
let asciiMeasureContext: CanvasRenderingContext2D | null = null;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById("password-field") as HTMLInputElement;
const PROMPT = document.getElementById("prompt-template");
const ACTIVE_PROMPT = document.getElementById("active-prompt");
let asciiFitFrame = 0;

if (PROMPT && ACTIVE_PROMPT) {
  renderPromptUi({ promptTemplate: PROMPT, activePrompt: ACTIVE_PROMPT });
}

const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const COMMAND_INPUT_MIRROR = document.getElementById("command-input-mirror");
const COMMAND_INPUT_SUGGESTION = document.getElementById("command-input-suggestion");
const HISTORY : string[] = [];
const SUDO_PASSWORD = command.password;
const REPO_LINK = command.repoLink;

function applyTheme(themePreference : ThemePreference, persist = true) {
  applyBrowserTheme(themePreference, persist);
}

function syncCommandInput() {
  if (!COMMAND_INPUT_MIRROR) return;
  COMMAND_INPUT_MIRROR.textContent = USERINPUT.value;
  COMMAND_INPUT_MIRROR.classList.toggle("is-valid-command", isKnownCommand(USERINPUT.value));
  if (COMMAND_INPUT_SUGGESTION) {
    COMMAND_INPUT_SUGGESTION.textContent = autocompleteSuffix(USERINPUT.value);
  }
}

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if(!MAIN) return

  MAIN.scrollTop = MAIN.scrollHeight;
}

function fitAsciiArt() {
  const MAIN = document.getElementById("main");
  const TERMINAL_CONTENT = document.getElementById("terminal");
  if (!MAIN || !TERMINAL_CONTENT) return;

  const artBlocks = Array.from(TERMINAL_CONTENT.querySelectorAll<HTMLPreElement>("pre.ascii-art"));
  if (artBlocks.length === 0) return;

  MAIN.style.removeProperty("--ascii-fit-size");
  MAIN.classList.add("is-measuring-ascii");

  try {
    const styles = getComputedStyle(artBlocks[0]);
    const inlineBleed = parseFloat(styles.getPropertyValue("--ascii-inline-bleed")) || 0;
    const horizontalScale = Math.max(parseFloat(styles.getPropertyValue("--ascii-horizontal-scale")) || 1, 0.5);
    const availableWidth = TERMINAL_CONTENT.getBoundingClientRect().width + inlineBleed * 2;
    const maxSize = parseFloat(styles.fontSize);
    const fontFamily = styles.fontFamily;
    const fontWeight = styles.fontWeight;
    const fontStyle = styles.fontStyle;

    asciiMeasureContext = asciiMeasureContext ?? document.createElement("canvas").getContext("2d");

    if (!asciiMeasureContext) return;

    asciiMeasureContext.font = `${fontStyle} ${fontWeight} ${maxSize}px ${fontFamily}`;
    const widestLine = Math.max(...artBlocks.map((block) => {
      const measuredLineWidth = (block.textContent ?? "").split("\n").reduce((widest, line) => {
        return Math.max(widest, asciiMeasureContext?.measureText(line).width ?? 0);
      }, 0);

      return Math.max(block.scrollWidth, measuredLineWidth);
    }));

    if (!availableWidth || !widestLine || !maxSize) return;

    const fittedSize = Math.min(maxSize, (maxSize * availableWidth * 0.998) / (widestLine * horizontalScale));
    MAIN.style.setProperty("--ascii-fit-size", `${Math.floor(fittedSize * 100) / 100}px`);
  } finally {
    MAIN.classList.remove("is-measuring-ascii");
  }
}

function fitBannerContacts() {
  const lists = Array.from(document.querySelectorAll<HTMLElement>(".banner-contact-list"));
  const terminalContent = document.getElementById("terminal");

  lists.forEach((list) => {
    list.classList.remove("is-stacked");

    const availableWidth = terminalContent?.clientWidth ?? list.clientWidth;
    const columnGap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".banner-row"));
    const shouldStack = rows.some((row) => {
      const label = row.querySelector<HTMLElement>(".banner-row-label");
      const value = row.querySelector<HTMLElement>(".banner-row-value");

      if (!label || !value) return false;

      return label.scrollWidth + value.scrollWidth + columnGap > availableWidth + 1;
    });

    list.classList.toggle("is-stacked", shouldStack);
  });
}

function queueAsciiFit() {
  if (asciiFitFrame) cancelAnimationFrame(asciiFitFrame);

  asciiFitFrame = requestAnimationFrame(() => {
    asciiFitFrame = 0;
    fitAsciiArt();
    fitBannerContacts();
  });
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.key;

  switch(key) {
    case "Enter":
      e.preventDefault();
      if (!shellMode.isPasswordInput) {
        enterKey();
      } else {
        passwordHandler();
      }

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      syncCommandInput();
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }

  requestAnimationFrame(syncCommandInput);
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  userInput = USERINPUT.value;

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    syncCommandInput();
    return
  }

  const div = createPromptHistoryEntry({
    input: userInput,
    promptHtml: PROMPT.innerHTML,
    bareMode: shellMode.bareMode,
    createElement: () => document.createElement("div"),
  });

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
  syncCommandInput();
}

function tabKey() {
  const match = autocompleteCommand(USERINPUT.value);

  if (match) {
    USERINPUT.value = match;
    syncCommandInput();
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
          syncCommandInput();
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
        syncCommandInput();
      }
      break;
  }
}

function resetTerminal() {
  setTimeout(() => {
    if(!TERMINAL || !WRITELINESCOPY) return
    TERMINAL.innerHTML = "";
    TERMINAL.appendChild(WRITELINESCOPY);
    mutWriteLines = WRITELINESCOPY;
  })
}

function showPasswordPrompt() {
  if(!PASSWORD) return
  shellMode = enterPasswordMode(shellMode);
  USERINPUT.disabled = true;

  if(INPUT_HIDDEN) INPUT_HIDDEN.style.display = "none";
  PASSWORD.style.display = "block";
  setTimeout(() => {
    PASSWORD_INPUT.focus();
  }, 100);
}

function createCommandContext() {
  return {
    bareMode: shellMode.bareMode,
    isSudo: shellMode.isSudo,
    username: command.username,
    repoLink: REPO_LINK,
    email: command.social.email,
    deviceInfo: getBrowserDeviceInfo(getStoredThemePreference(localStorage)),
  };
}

function handleCommandEffect(effect?: ShellEffect) {
  switch(effect?.type) {
    case "clear":
      resetTerminal();
      break;
    case "theme":
      applyTheme(effect.preference);
      break;
    case "open":
      setTimeout(() => {
        window.open(effect.url, '_blank');
      }, 500);
      break;
    case "mailto":
      setTimeout(() => {
        window.location.href = `mailto:${effect.email}`;
      }, 500);
      break;
    case "passwordPrompt":
      showPasswordPrompt();
      break;
    case "enterBareMode":
      shellMode = enterBareMode(shellMode);
      resetTerminal();
      easterEggStyles();
      setTimeout(() => {
        writeLines(["What made you think that was a good idea?", "<br>"]);
      }, 200)

      setTimeout(() => {
        writeLines(["Now everything is ruined.", "<br>"]);
      }, 1200)
      break;
  }
}

function commandHandler(input : string) {
  const result = runCommand(input, createCommandContext());
  handleCommandEffect(result.effect);

  if (result.lines.length > 0) {
    writeLines(result.lines);
  }
}

function writeLines(message : string[], options: { delayMs?: number } = {}) {
  if (!mutWriteLines) return

  writeTranscriptLines(message, {
    target: mutWriteLines,
    createParagraph: () => document.createElement("p"),
    insertBefore: (paragraph, target) => {
      target.parentNode?.insertBefore(paragraph, target);
      queueAsciiFit();
    },
    scrollToBottom,
    delayMs: options.delayMs,
  });
}

function revertPasswordChanges() {
    if (!INPUT_HIDDEN || !PASSWORD) return
    PASSWORD_INPUT.value = "";
    USERINPUT.disabled = false;
    INPUT_HIDDEN.style.display = "block";
    PASSWORD.style.display = "none";
    shellMode = exitPasswordMode(shellMode);

    setTimeout(() => {
      USERINPUT.focus();
    }, 200)
}

function passwordHandler() {
  const result = submitPassword(shellMode, PASSWORD_INPUT.value, SUDO_PASSWORD);
  shellMode = result.mode;

  if (result.status === "locked") {
    if (!INPUT_HIDDEN || !mutWriteLines || !PASSWORD) return
    writeLines(["<br>", "INCORRECT PASSWORD.", "PERMISSION NOT GRANTED.", "<br>"])
    revertPasswordChanges();
    return
  }

  if (result.status === "granted") {
    if (!mutWriteLines || !mutWriteLines.parentNode) return
    writeLines(["<br>", "PERMISSION GRANTED.", "Try <span class='command'>'rm -rf'</span>", "<br>"])
    revertPasswordChanges();
    return
  }

  PASSWORD_INPUT.value = "";
}

function easterEggStyles() {   
  const bars = document.getElementById("bars");
  const body = document.body;
  const main = document.getElementById("main");
  const span = document.getElementsByTagName("span");

  if (!bars) return
  bars.innerHTML = "";
  bars.remove()

  if (main) main.style.border = "none";

  body.style.backgroundColor = "black";
  body.style.fontFamily = "VT323, monospace";
  body.style.fontSize = "20px";
  body.style.color = "white";

  for (let i = 0; i < span.length; i++) {
    span[i].style.color = "white";
  }

  USERINPUT.style.backgroundColor = "black";
  USERINPUT.style.color = "white";
  USERINPUT.style.fontFamily = "VT323, monospace";
  USERINPUT.style.fontSize = "20px";
  if (PROMPT) PROMPT.style.color = "white";
  if (ACTIVE_PROMPT) ACTIVE_PROMPT.style.color = "white";

}

const initEventListeners = () => {
    applyTheme(getStoredThemePreference(localStorage), false);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (getStoredThemePreference(localStorage) === "system") {
        applyTheme("system", false);
      }
    });

  writeLines(runCommand("banner", createCommandContext()).lines);
  
  USERINPUT.addEventListener('keypress', userInputHandler);
  USERINPUT.addEventListener('keydown', userInputHandler);
  USERINPUT.addEventListener('input', syncCommandInput);
  PASSWORD_INPUT.addEventListener('keypress', userInputHandler);

  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  const MAIN = document.getElementById("main");
  if (MAIN && "ResizeObserver" in window) {
    new ResizeObserver(queueAsciiFit).observe(MAIN);
  } else {
    window.addEventListener("resize", queueAsciiFit);
  }

  if ("fonts" in document) {
    document.fonts.ready.then(queueAsciiFit);
    document.fonts.addEventListener?.("loadingdone", queueAsciiFit);
  }

  console.log(`%cPassword: ${command.password}`, "color: red; font-size: 20px;");
}

initEventListeners();
