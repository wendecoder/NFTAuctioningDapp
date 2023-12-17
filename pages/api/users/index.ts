// pages/api/users.js
import { PrismaClient } from "@prisma/client";

// import prisma from '../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  
    try {
      const { tokenId, startingPrice, startTime, duration } = await req.body;
      const currentTime = new Date();
      const correctStartTime = new Date(currentTime.getTime() + startTime * 1000);
      const endTime = new Date(correctStartTime.getTime() + duration * 1000);
      
        console.log("inside api");
        console.log(tokenId);
      // Insert data into the Prisma model
      
      await prisma.user.create({
        data: {
          nftTokenId: Number(tokenId),
          startingPrice: Number(startingPrice),
          startTime: correctStartTime,
          endTime: endTime,
        },
      });

      return res.status(200).json({ message: 'NFT data inserted successfully' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  

  // Handle other HTTP methods if needed
  return res.status(400).json({ message: 'Not Found' });
}
