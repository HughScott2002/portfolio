const SPACE = "&nbsp;";

export type TerminalLine = string;

export function commandToken(label: string) {
  return `<span class='command'>${label}</span>`;
}

export function link(label: string, href: string) {
  return `<a target='_blank' rel='noreferrer' href='${href}'>${label}</a>`;
}

export function bannerLink(fullLabel: string, compactLabel: string, href: string) {
  return `<a class='banner-link' target='_blank' rel='noreferrer' href='${href}'><span class='banner-link-full'>${fullLabel}</span><span class='banner-link-compact'>${compactLabel}</span></a>`;
}

export function rowLabel(iconClass: string, label: string) {
  return `<span class='terminal-row-label'><i class='${iconClass}'></i><span>${label}</span></span>`;
}

export function bannerRow(label: string, value: string) {
  return `<span class='banner-row'><span class='banner-row-label'>${label}</span><span class='banner-row-value'>${value}</span></span>`;
}

export function bannerContactList(rows: string[]) {
  return `<span class='banner-contact-list'>${rows.join("")}</span>`;
}

export function commandHint(commands: string, detail: string) {
  return `<span class='command-hint'><span class='command-hint-lead'>Type </span><span class='command-hint-commands'>${commands}</span><span class='command-hint-detail'>${detail}</span></span>`;
}

export function commandHelpRow(command: string, description: string) {
  return `<span class='command-help-row'><span class='command-help-name'>${command}</span><span class='command-help-description'>${description}</span></span>`;
}

export function commandHelpList(rows: string[]) {
  return `<span class='command-help-list'>${rows.join("")}</span>`;
}

export function row(label: string, value: string, width = 17, visibleLength = label.length, indent = 2) {
  return `${SPACE.repeat(indent)}${label}${SPACE.repeat(Math.max(2, width - visibleLength))}${value}`;
}

export function asciiBlock(lines: string[]) {
  return `<pre class='ascii-art'>${lines.map((line) => line.split(" ").join(SPACE)).join("\n")}</pre>`;
}

export function countLine(count: number) {
  return `<span class='terminal-count'>${count}</span> File(s)`;
}
