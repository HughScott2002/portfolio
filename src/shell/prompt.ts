function nixosLogoHtml(extraClass = "") {
  const className = `nixos-logo${extraClass ? ` ${extraClass}` : ""}`;
  return `
                <span class="${className}" aria-label="NixOS" role="img">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>`;
}

function commandInputHtml() {
  return `
	              <span class="command-input-wrap">
	                <span id="command-input-mirror" class="command-input-mirror" aria-hidden="true"></span>
	                <span class="command-input-cursor" aria-hidden="true"></span>
	                <span id="command-input-suggestion" class="command-input-suggestion" aria-hidden="true"></span>
	                <input id="user-input" type="text" enterkeyhint="Enter" spellcheck="false" autocapitalize="none"
	                  autocomplete="off" />
	              </span>`;
}

export function createPromptHtml(options: { active?: boolean } = {}) {
  return `<div class="prompt-line prompt-line-top">
            <span class="prompt-corner">╭─</span>
            <span class="prompt-segments">
              <span class="prompt-block prompt-logo-block" aria-label="NixOS" role="img">${nixosLogoHtml("prompt-logo")}
              </span>
              <span class="prompt-block prompt-user">hugh</span>
              <span class="prompt-block prompt-path">~/portfolio</span>
              <span class="prompt-block prompt-device">device</span>
              <span class="prompt-block prompt-theme">system</span>
            </span>
          </div>
          <div class="prompt-line prompt-line-bottom">
            <span class="prompt-corner">╰─</span><span class="prompt-chevron">❯</span>${options.active ? commandInputHtml() : ""}
          </div>`;
}

export function renderPromptUi(options: {
  promptTemplate: HTMLElement;
  activePrompt: HTMLElement;
}) {
  options.promptTemplate.innerHTML = createPromptHtml();
  options.activePrompt.innerHTML = createPromptHtml({ active: true });
}
