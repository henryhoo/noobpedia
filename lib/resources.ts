import { bumpResourceLike } from "lib/firestore";

export async function bumpLike(resourceName: string): Promise<boolean> {
  return await bumpResourceLike(resourceName);
}
