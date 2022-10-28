import type { NextApiRequest, NextApiResponse } from "next";
import { doc, setDoc } from 'firebase/firestore';

import { db } from "../../firebase/clientApp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const {template, userId } = req.body;

    try {
      const userRef = doc(db, 'user', userId);

      const docRef = await setDoc(userRef, { templates: { [template.name]: { ...template } } }, { merge: true });
      
      res.status(201).json(docRef);
    } catch (error) {
      res.status(500).json({ message: "Couldn't upload template to the cloud." });
    }
  }
}