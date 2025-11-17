import { decryptCardCode } from "../../utils/encryption";
import Order from "./order.schema";
export const sendCodeViaMail = async ({ mail, order }) => {
  try {
    const res = await mail({
      receiver: order.email,
      subject: "GIFTCARD - Order Confirmation",
      body: ` <!DOCTYPE html> <html> <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"> <p>Dear User,</p> <p>Thank you for your purchase from <strong>GIFTCARD</strong>. Below are the details of your gift card order:</p> <table style="border-collapse: collapse; width: 100%; max-width: 600px;"> <tr> <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Name</strong></td> <td style="padding: 8px; border: 1px solid #ddd;">${order.cardId.name}</td> </tr> <tr> <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Code</strong></td> <td style="padding: 8px; border: 1px solid #ddd;">${order.cardCode}</td> </tr> <tr> <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Value</strong></td> <td style="padding: 8px; border: 1px solid #ddd;">$${order.cardId.cardValue}</td> </tr> <tr> <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Price</strong></td> <td style="padding: 8px; border: 1px solid #ddd;">$${order.cardId.price}</td> </tr> </table> <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p> <p>Best regards,<br/> <strong>GIFTCARD</strong> Team</p> </body> </html> `,
      type: "html",
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
