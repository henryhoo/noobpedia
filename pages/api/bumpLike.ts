import { bumpLike } from "lib/resources";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resourceName: string = req.body.resourceName;
    const data = await bumpLike(resourceName);
    res.status(200).send({ status: "success" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};
