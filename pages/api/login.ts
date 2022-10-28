import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { validateEmail } from "../../utils/functions";
import { getUserById, getUserIdByEmail, getUserIdByUsername } from "../../utils/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const { id, password } = req.body;
    const isEmail = validateEmail(id);

    let userId = "";

    try {
      if (isEmail) {
        userId = (await getUserIdByEmail(id))[0]; 
      } else {
        userId = (await getUserIdByUsername(id))[0];
      }
      if (!userId) res.status(404).json({ message: "User doesn't exist" });

      const user = await getUserById(userId);
      if ( user !== undefined ) {
        const val_pass = await bcrypt.compare(password, user.password);

        if (val_pass) {
          res.status(200).json({ ...user, userId});
        } else {
          res.status(401).json({ message: "Incorrect Account or Password."});
        }
      } else {
        res.status(500).json({ message: "Something went wrong"});
      }
      
    } catch (error) {
      res.status(500).json({ message: "Something went wrong."});
    }
  }
}