import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { SetStorage } from '@/data/protocols/cache';

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter();
};
