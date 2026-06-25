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
    "Whoami? I'm Hugh Scott.",
    "I'm a software developer from Mandeville, Jamaica.",
    "I love building software and making music.",
    "My long-term goal is to build a unicorn startup from Jamaica.",
    "But enough about me...",
    "\n\nPlot twist: this terminal runs on your side.",
    "So here's what your browser says:",
    row(commandToken("device"), metricValue(info.device), 13, "device".length),
    row(commandToken("theme"), metricValue(`${info.theme} (${info.resolvedTheme})`), 13, "theme".length),
    row(commandToken("language"), metricValue(info.language), 13, "language".length),
    row(commandToken("timezone"), metricValue(info.timezone), 13, "timezone".length),
    row(commandToken("screen"), metricValue(info.screen), 13, "screen".length),
    row(commandToken("cpu"), metricValue(info.cpuThreads), 13, "cpu".length),
    row(commandToken("memory"), metricValue(info.memory), 13, "memory".length),
    row(commandToken("network"), metricValue(info.online), 13, "network".length),
    "<br>",
  ];
}
