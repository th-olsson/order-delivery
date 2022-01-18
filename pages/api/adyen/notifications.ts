import { NextApiRequest, NextApiResponse } from "next";
import { hmacValidator } from "@adyen/api-library";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validator = new hmacValidator();

    const notificationRequestItems = req.body.notificationItems;

    console.log("Notification request items below:");
    console.log(notificationRequestItems);

    // Be sure to store the notifications in a database.

    notificationRequestItems.forEach((item: any) => {
      if (
        validator.validateHMAC(
          item.NotificationRequestItem,
          process.env.HMAC_KEY || "",
        )
      ) {
        const eventCode = item.NotificationRequestItem.eventCode;

        if (eventCode === "AUTHORISATION") {
          if (item.NotificationRequestItem.success === "true") {
            // Payment was successful.
          } else {
            // Payment was not successful.
          }
        } else {
          console.log("Non-valid NotificationRequest");
        }
      }
    });

    res.send("[accepted]");
  } catch (error) {
    console.log(error);
  }
}
