import { useMemo } from 'react';
import { DBOperations, Key, CreateObjectStore } from './indexed-db';

export interface IndexedDBProps {
  name: string;
  version: number;
  objectStoresMeta: ObjectStoreMeta[];
}

export interface ObjectStoreMeta {
  store: string;
  storeConfig: { keyPath: string; autoIncrement: boolean; [key: string]: any };
  storeSchema: ObjectStoreSchema[];
}

export interface ObjectStoreSchema {
  name: string;
  keypath: string;
  options: { unique: boolean; [key: string]: any };
}

export interface useIndexedDB {
  dbName: string;
  version: number;
  objectStore: string;
}

const indexeddbConfiguration: { version: number; name: string } = {
  version: 0,
  name: '',
};

export function initDB({ name, version, objectStoresMeta }: IndexedDBProps) {
  console.log('initDB', name, version, objectStoresMeta);
  var created = CreateObjectStore(name, version, objectStoresMeta);
  if (created) {
    indexeddbConfiguration.name = name;
    indexeddbConfiguration.version = version;
    Object.freeze(indexeddbConfiguration);
  }
  return created;
}

export function useIndexedDB(
  objectStore: string,
  props?: IndexedDBProps,
): {
  add: <T = any>(value: T, key?: any) => Promise<number>;
  getByID: <T = any>(id: number | string) => Promise<T>;
  getAll: <T = any>() => Promise<T[]>;
  update: <T = any>(value: T, key?: any) => Promise<any>;
  deleteRecord: (key: Key) => Promise<any>;
  openCursor: (
    cursorCallback: (event: Event) => void,
    keyRange?: IDBKeyRange,
  ) => Promise<void>;
  getByIndex: (indexName: string, key: any) => Promise<any>;
  clear: () => Promise<any>;
} {
  const uninitialized = {
    add: () => Promise.resolve(0),
    getByID: <T = any>() => Promise.resolve({} as T),
    getAll: () => Promise.resolve([]),
    update: () => Promise.resolve({}),
    deleteRecord: () => Promise.resolve({}),
    openCursor: () => Promise.resolve(),
    getByIndex: () => Promise.resolve({}),
    clear: () => Promise.resolve({}),
  };
  const isClient = typeof window === 'object';
  if (!isClient) {
    return uninitialized;
  }

  return useMemo(() => {
    if (!indexeddbConfiguration.name || !indexeddbConfiguration.version) {
      if (!props) {
        throw new Error('Please, initialize the DB before the use.');
      } else {
        var created = initDB(props);
        if (!created) {
          return uninitialized;
        }
      }
    }

    return DBOperations(
      indexeddbConfiguration.name,
      indexeddbConfiguration.version,
      objectStore,
    );
  }, [indexeddbConfiguration, objectStore]);
}
