import Dexie, { type EntityTable } from "dexie";

type ContractInfo = {
  id: number;
  name: string;
  uuid: string;
  pdf: string;
  last_modified: string;
};

const db = new (Dexie as any)("ContractsDatabase") as {
  contracts: EntityTable<ContractInfo, "id">;
  version: (version: number) => {
    stores: (schema: Record<string, string>) => void;
  };
};

// Schema declaration:
db.version(1).stores({
  contracts: "++id, name, uuid, contact_pdf, summaryInfo, last_modified",
});

export type { ContractInfo };
export { db };
