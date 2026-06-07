import { describe, expect, it } from "vitest";
import { createInitialShellMode, enterPasswordMode, enterBareMode, submitPassword } from "./mode";

describe("shell mode", () => {
  it("owns password, sudo, and bare-mode transitions", () => {
    let mode = createInitialShellMode();

    mode = enterPasswordMode(mode);
    expect(mode.isPasswordInput).toBe(true);

    let result = submitPassword(mode, "wrong", "secret");
    expect(result.status).toBe("retry");
    expect(result.mode.passwordCounter).toBe(1);

    result = submitPassword(result.mode, "wrong", "secret");
    expect(result.status).toBe("retry");
    expect(result.mode.passwordCounter).toBe(2);

    result = submitPassword(result.mode, "secret", "secret");
    expect(result.status).toBe("locked");
    expect(result.mode.isPasswordInput).toBe(false);
    expect(result.mode.passwordCounter).toBe(0);

    mode = enterPasswordMode(result.mode);
    result = submitPassword(mode, "secret", "secret");
    expect(result.status).toBe("granted");
    expect(result.mode.isSudo).toBe(true);

    mode = enterBareMode(result.mode);
    expect(mode.bareMode).toBe(true);
  });
});
