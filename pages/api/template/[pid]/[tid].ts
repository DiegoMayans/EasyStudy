import type { NextApiRequest, NextApiResponse } from "next";
import { changeTemplateName, deleteTemplate, getTemplate } from "../../../../utils/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { pid, tid } = req.query;

    try {
      let template = {};
      
      if (typeof pid === 'string' && typeof tid === 'string') {
        template = await getTemplate(pid, tid);
      };

      res.status(200).json(template);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong fetching templates" });
    }
  }
  if(req.method === 'DELETE') {
    const { pid, tid } = req.query;
    
    try {
      if (typeof pid === 'string' && typeof tid === 'string' ) {
        deleteTemplate(pid, tid);
        res.status(200).json({ message: "Template successfully deleted." });
      } else {
        res.status(500).json({ message: "Can't delete template. Something went wrong." });  
      }
      
    } catch (e) {
      res.status(500).json({ message: "Can't delete template. Something went wrong." });
    }
  }
  if(req.method === 'PATCH') {
    const { pid, tid } = req.query;
    const { name } = req.body;

    try {
      if (typeof pid === 'string' && typeof tid === 'string' ) {
        changeTemplateName(pid, tid, name);
        res.status(200).json({ message: "Template name updated."});
      } else {
        res.status(401).json({ message: "Can't update name. Wrong types detected." })
      }
      
    } catch (error) {
      res.status(500).json({ message: "Something went wrong."});
    }
  }
}