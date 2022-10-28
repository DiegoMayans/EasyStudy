import { addDoc, collection } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../firebase/clientApp";
import { getUserIdBySub } from "../../utils/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const { email, name, sub, picture } = req.body;

    try {

      const userExists = await getUserIdBySub(sub);

      if (userExists.length) {
        res.status(200).json(userExists[0]);
      } else {
        const newUserRef= await addDoc(collection(db, "user"), {
          email,
          username: name,
          sub
        });
        
        res.status(200).json(newUserRef.id);
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  }
}