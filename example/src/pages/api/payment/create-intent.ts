import { NextApiRequest, NextApiResponse } from "next";
import client, { type PaymentIntentOutput } from "~/lib/paymongo";

type ErrResponse = {
  error: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PaymentIntentOutput | ErrResponse>
) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const intent = await client.intent.create(req.body);
    return res.status(200).json(intent);
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};

export default handler;
