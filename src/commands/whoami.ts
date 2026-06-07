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

export const createWhoami = (info : DeviceInfo) : string[] => {
  return [
    "<br>",
    "Whoami? I still cannot see your name, but your browser left a few terminal crumbs:",
    row(commandToken("device"), info.device, 13, "device".length),
    row(commandToken("theme"), `${info.theme} (${info.resolvedTheme})`, 13, "theme".length),
    row(commandToken("language"), info.language, 13, "language".length),
    row(commandToken("timezone"), info.timezone, 13, "timezone".length),
    row(commandToken("screen"), info.screen, 13, "screen".length),
    row(commandToken("cpu"), info.cpuThreads, 13, "cpu".length),
    row(commandToken("memory"), info.memory, 13, "memory".length),
    row(commandToken("network"), info.online, 13, "network".length),
    "<br>",
  ];
}
