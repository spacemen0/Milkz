import { MMKV } from "react-native-mmkv";

class MMKVFaker {
  private store: { [key: string]: any };

  constructor() {
    this.store = {};
  }

  set(key: string, value: boolean | string): void {
    this.store[key] = value;
  }

  getString(key: string): string | null {
    const value = this.store[key];
    return typeof value === "string" ? value : null;
  }

  getBool(key: string): boolean | null {
    const value = this.store[key];
    return typeof value === "boolean" ? value : null;
  }
}

export const storage = __DEV__
  ? new MMKVFaker()
  : new MMKV({
      id: "auth",
    });
