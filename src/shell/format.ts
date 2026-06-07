const SPACE = "&nbsp;";

export type TerminalLine = string;

export function commandToken(label: string) {
  return `<span class='command'>${label}</span>`;
}

export function link(label: string, href: string) {
  return `<a target='_blank' href='${href}'>${label}</a>`;
}

export function row(label: string, value: string, width = 17, visibleLength = label.length, indent = 2) {
  return `${SPACE.repeat(indent)}${label}${SPACE.repeat(Math.max(2, width - visibleLength))}${value}`;
}

export function asciiLine(line: string) {
  return `<pre>${line.split(" ").join(SPACE)}</pre>`;
}

export function countLine(count: number) {
  return `${count} File(s)`;
}
