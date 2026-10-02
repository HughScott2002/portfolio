import github from "../icons/github.svg?raw";
import huggingFace from "../icons/hugging-face.svg?raw";

const icons = {
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
  github,
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM8 19H5V9h3ZM6.5 7.5A1.75 1.75 0 1 1 6.5 4a1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-5.2c0-1.2-.3-2-1.4-2-1 0-1.6.7-1.6 2V19h-3V9h2.9v1.3a3.4 3.4 0 0 1 3-1.5c2.2 0 3.1 1.4 3.1 4.2Z"/></svg>',
  huggingFace,
};

export type ContactIcon = keyof typeof icons;

export function contactIcon(icon: ContactIcon) {
  return `<span class='terminal-icon' aria-hidden='true'>${icons[icon]}</span>`;
}
