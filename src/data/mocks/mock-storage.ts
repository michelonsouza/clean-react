import { SetStorage } from '@/data/protocols/cache/set-storage';

export class SetStorageSpy implements SetStorage {
  key = '';

  value: any = '';

  async set(
    key: string,
    value: Record<string, unknown> | string | number,
  ): Promise<void> {
    this.key = key;
    this.value = value;
  }
}
