import { v4 as uuidv4 } from "uuid";

import { db } from "./db.ts";
import type { ContractInfo } from "./db.ts";

export const getContract = async (uuid: string) => {
  const contract = await db.contracts.where("uuid").equals(uuid).first();
  return new Promise<ContractInfo | null>((resolve) => {
    resolve(contract || null);
  });
};
