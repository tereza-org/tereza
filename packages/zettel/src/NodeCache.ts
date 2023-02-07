import { Cache } from './Cache';

export class NodeCache implements Cache {
  private _cache = new Map<string, any>();

  public async get(key: string) {
    return this._cache.get(key);
  }

  public async set(key: string, value: any) {
    this._cache.set(key, value);
  }

  public async has(key: string) {
    return this._cache.has(key);
  }
}
