export type ShellModeState = {
  isSudo: boolean;
  isPasswordInput: boolean;
  passwordCounter: number;
  bareMode: boolean;
};

export type PasswordResult =
  | { status: "granted"; mode: ShellModeState }
  | { status: "locked"; mode: ShellModeState }
  | { status: "retry"; mode: ShellModeState };

export function createInitialShellMode(): ShellModeState {
  return {
    isSudo: false,
    isPasswordInput: false,
    passwordCounter: 0,
    bareMode: false,
  };
}

export function enterPasswordMode(mode: ShellModeState): ShellModeState {
  return {
    ...mode,
    isPasswordInput: true,
  };
}

export function exitPasswordMode(mode: ShellModeState): ShellModeState {
  return {
    ...mode,
    isPasswordInput: false,
  };
}

export function enterBareMode(mode: ShellModeState): ShellModeState {
  return {
    ...mode,
    bareMode: true,
  };
}

export function submitPassword(mode: ShellModeState, input: string, expectedPassword: string): PasswordResult {
  if (mode.passwordCounter === 2) {
    return {
      status: "locked",
      mode: {
        ...mode,
        isPasswordInput: false,
        passwordCounter: 0,
      },
    };
  }

  if (input === expectedPassword) {
    return {
      status: "granted",
      mode: {
        ...mode,
        isSudo: true,
        isPasswordInput: false,
        passwordCounter: 0,
      },
    };
  }

  return {
    status: "retry",
    mode: {
      ...mode,
      passwordCounter: mode.passwordCounter + 1,
    },
  };
}
