export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export type DeviceInfo = {
  device: string;
  theme: string;
  resolvedTheme: string;
  language: string;
  timezone: string;
  screen: string;
  cpuThreads: string;
  memory: string;
  online: string;
};

type TextTarget = {
  textContent: string | null;
};

type DatasetTarget = {
  dataset: Record<string, string | undefined>;
};

export const THEME_STORAGE_KEY = "webshell-theme";

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function getStoredThemePreference(storage: Pick<Storage, "getItem">, key = THEME_STORAGE_KEY): ThemePreference {
  const storedTheme = storage.getItem(key);
  return isThemePreference(storedTheme) ? storedTheme : "system";
}

export function resolveThemePreference(themePreference: ThemePreference, prefersDark: boolean): ResolvedTheme {
  if (themePreference === "system") {
    return prefersDark ? "dark" : "light";
  }

  return themePreference;
}

export function applyThemePreference(
  themePreference: ThemePreference,
  options: {
    root: DatasetTarget;
    storage?: Pick<Storage, "setItem">;
    promptDeviceElements: Iterable<TextTarget>;
    promptThemeElements: Iterable<TextTarget>;
    deviceLabel: string;
    prefersDark: boolean;
    persist?: boolean;
  },
) {
  const resolvedTheme = resolveThemePreference(themePreference, options.prefersDark);
  options.root.dataset.theme = resolvedTheme;

  for (const element of options.promptDeviceElements) {
    element.textContent = options.deviceLabel;
  }

  for (const element of options.promptThemeElements) {
    element.textContent = themePreference;
  }

  if (options.persist !== false) {
    options.storage?.setItem(THEME_STORAGE_KEY, themePreference);
  }

  return resolvedTheme;
}

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getDeviceLabel(nav: Navigator & { userAgentData?: { platform?: string } } = navigator) {
  const platform = `${nav.userAgentData?.platform || nav.platform || ""}`.toLowerCase();
  const userAgent = nav.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (platform.includes("android") || userAgent.includes("android")) return "android";
  if (platform.includes("mac")) return "mac";
  if (platform.includes("win")) return "win";
  if (platform.includes("linux") || userAgent.includes("linux")) return "lin";
  return "web";
}

export function getBrowserDeviceInfo(themePreference: ThemePreference): DeviceInfo {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const resolvedTheme = themePreference === "system" ? getSystemTheme() : themePreference;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  const memory = typeof nav.deviceMemory === "number" ? `${nav.deviceMemory} GB` : "not shared";
  const cpuThreads = typeof navigator.hardwareConcurrency === "number" ? `${navigator.hardwareConcurrency} threads` : "not shared";

  return {
    device: getDeviceLabel(),
    theme: themePreference,
    resolvedTheme,
    language: navigator.language || "unknown",
    timezone,
    screen: `${window.screen.width}x${window.screen.height}`,
    cpuThreads,
    memory,
    online: navigator.onLine ? "online" : "offline",
  };
}

export function applyBrowserTheme(themePreference: ThemePreference, persist = true) {
  return applyThemePreference(themePreference, {
    root: document.documentElement,
    storage: localStorage,
    promptDeviceElements: document.querySelectorAll(".prompt-device"),
    promptThemeElements: document.querySelectorAll(".prompt-theme"),
    deviceLabel: getDeviceLabel(),
    prefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    persist,
  });
}
