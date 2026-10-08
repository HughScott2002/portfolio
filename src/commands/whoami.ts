import { commandToken, row } from "../shell/format";

type DeviceInfo = {
  device: string;
  theme: string;
  resolvedTheme: string;
  language: string;
  timezone: string;
  screen: string;
  cpuThreads: string;
  memory: string;
  online: string;
}

function metricValue(value: string) {
  return `<span class='terminal-metric-value'>${value}</span>`;
}

export const createWhoami = (info: DeviceInfo): string[] => {
  return [
    "<span class='whoami-intro'><span class='whoami-name' role='heading' aria-level='2'>Hugh Scott</span><span class='whoami-role'>Software Engineer · Mandeville, Jamaica</span></span>",
    "<span class='whoami-copy'>I build polished interfaces, backend services, and AI tools.</span>",
    "<span class='whoami-section-title' role='heading' aria-level='3'>Core skills</span>",
    "<span class='whoami-skills'>TypeScript · Go · Rust · Full-stack engineering · AI tooling · Technical operations</span>",
    "<span class='whoami-section-title' role='heading' aria-level='3'>Beyond the code</span>",
    "I make music.",
    "<span class='whoami-section-title' role='heading' aria-level='3'>Your browser</span>",
    "<span class='whoami-browser-intro'>Here's some stuff I know about you.</span>",
    row(commandToken("device"), metricValue(info.device), "7rem"),
    row(commandToken("theme"), metricValue(`${info.theme} (${info.resolvedTheme})`), "7rem"),
    row(commandToken("language"), metricValue(info.language), "7rem"),
    row(commandToken("timezone"), metricValue(info.timezone), "7rem"),
    row(commandToken("screen"), metricValue(info.screen), "7rem"),
    row(commandToken("cpu"), metricValue(info.cpuThreads), "7rem"),
    row(commandToken("memory"), metricValue(info.memory), "7rem"),
    row(commandToken("network"), metricValue(info.online), "7rem"),
    "<br>",
  ];
}
