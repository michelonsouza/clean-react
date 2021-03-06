import { SetStorage } from '@/data/protocols/cache/set-storage';

export class SetStorageMock implements SetStorage {
  key = '';

  value: any = '';

  async set(key: string, value: string): Promise<void> {
    this.key = key;
    this.value = value;
  }
}
