import { describe, expect, it } from "vitest";
import { applyThemePreference, getDeviceLabel, getStoredThemePreference, resolveThemePreference } from "./theme";

describe("theme preference", () => {
  it("resolves, persists, and updates prompt theme labels through one interface", () => {
    const storedValues = new Map<string, string>();
    const root = { dataset: {} as Record<string, string> };
    const deviceLabel = { textContent: "" };
    const themeLabel = { textContent: "" };

    expect(getStoredThemePreference({ getItem: () => "invalid" })).toBe("system");
    expect(resolveThemePreference("system", true)).toBe("dark");
    expect(resolveThemePreference("system", false)).toBe("light");

    applyThemePreference("dark", {
      root,
      storage: {
        setItem: (key, value) => storedValues.set(key, value),
      },
      promptDeviceElements: [deviceLabel],
      promptThemeElements: [themeLabel],
      deviceLabel: "mac",
      prefersDark: false,
    });

    expect(root.dataset.theme).toBe("dark");
    expect(storedValues.get("webshell-theme")).toBe("dark");
    expect(deviceLabel.textContent).toBe("mac");
    expect(themeLabel.textContent).toBe("dark");
  });

  it("prefers platform data over misleading iOS-looking user agents", () => {
    const iPhoneLikeUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)";

    expect(getDeviceLabel({
      platform: "Linux x86_64",
      userAgent: iPhoneLikeUserAgent,
      userAgentData: { platform: "Linux" },
    } as Navigator & { userAgentData: { platform: string } })).toBe("lin");

    expect(getDeviceLabel({
      platform: "MacIntel",
      userAgent: iPhoneLikeUserAgent,
      userAgentData: { platform: "macOS" },
    } as Navigator & { userAgentData: { platform: string } })).toBe("mac");

    expect(getDeviceLabel({
      platform: "iPhone",
      userAgent: iPhoneLikeUserAgent,
    } as Navigator)).toBe("ios");
  });
});
