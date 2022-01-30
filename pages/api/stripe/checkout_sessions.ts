import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Request product (gets only price for now)
      const { price: incomingPrice } = req.body;
      const unitAmount = incomingPrice * 100;

      // TODO: Change from hard coded product and possibly create multiple products. Currently it just counts total price as a product.
      const product = await stripe.products.create({ name: "Blomsterbud" });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: unitAmount,
        currency: "sek",
      });

      // TODO: Get order metadata from client to be able to use it in webhooks
      const metadata = {
        sender_name: "John Doe",
        sender_email: "john.doe@mail.com",
        sender_phone: "0701234567",
        sender_message:
          "Hej, detta är ett meddelande från en kund till butiken.",
        receiver_name: "Jane Doe",
        receiver_phone: "0709876543",
        receiver_street: "Gatan 1",
        receiver_city: "Staden",
        receiver_zip: "12345",
        receiver_message:
          "Detta är ett meddelande från en kund till en mottagare.",
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: price.id,
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: metadata,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.json({ url: session.url });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
