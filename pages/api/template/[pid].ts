import type { NextApiRequest, NextApiResponse } from "next";
import { getUserTemplates } from "../../../utils/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { pid } = req.query;

    try {
      let templates = {};
      
      if (typeof pid === 'string') {
        templates = await getUserTemplates(pid);
      };

      res.status(200).json(templates);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong fetching templates" });
    }
  }
}