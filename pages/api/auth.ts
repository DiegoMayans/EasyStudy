import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { addDoc, collection } from "firebase/firestore";

import { db } from "../../firebase/clientApp";
import { getUserIdByEmail, getUserIdByUsername } from "../../utils/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const { email, password, username, confirmPassword } = req.body;

    try {
      const usernameExists = await getUserIdByUsername(username);

      if (usernameExists.length) {
        return res.status(400).json({message: "Username already being used"});
      } 

      const emailExists = await getUserIdByEmail(email);      

      if (emailExists.length) {
        return res.status(400).json({message: "Email already being used"});
      } 

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUserRef = await addDoc(collection(db, "user"), {
        email,
        password: hashedPassword,
        username,
      });

      res.status(200).json(newUserRef);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
    
  }
}