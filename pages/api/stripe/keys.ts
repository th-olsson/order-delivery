import { NextApiRequest, NextApiResponse } from "next";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      publishableKey,
    });
  } else {
    res.status(405).end("Method not allowed");
  }
}
