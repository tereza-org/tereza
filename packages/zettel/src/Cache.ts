export class Cache {
  constructor() {
    if (this.constructor == Cache) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async get(key: string): Promise<any> {
    throw new Error("Method 'get()' must be implemented.");
  }

  async set(key: string, value: any): Promise<void> {
    throw new Error("Method 'set()' must be implemented.");
  }

  async has(key: string): Promise<boolean> {
    throw new Error("Method 'has()' must be implemented.");
  }
}
