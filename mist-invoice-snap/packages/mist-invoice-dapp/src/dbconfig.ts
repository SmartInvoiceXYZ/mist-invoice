export const DBConfig = {
  name: "MistDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "mist-data",
      storeConfig: { keyPath: "id", type: "string", autoIncrement: false },
      storeSchema: [
        { name: "provider", keypath: "provider", options: { unique: false } },
        {
          name: "clientRandom",
          keypath: "clientRandom",
          options: { unique: true }
        },
        {
          name: "providerRandom",
          keypath: "providerRandom",
          options: { unique: true }
        },
        { name: "clientKey", keypath: "clientKey", options: { unique: true } },
        {
          name: "providerKey",
          keypath: "providerKey",
          options: { unique: true }
        }
      ]
    }
  ]
};
