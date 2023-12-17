// pages/api/users.js
import { PrismaClient } from "@prisma/client";

// import prisma from '../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  
    try {
      
        const currentTime = new Date();

        const users = await prisma.user.findMany({
          where: {
            startTime: {
              lte: currentTime,
            },
            endTime: {
              gte: currentTime,
            },
          },
        })
        
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  

  // Handle other HTTP methods if needed
  return res.status(400).json({ message: 'Not Found' });
}
