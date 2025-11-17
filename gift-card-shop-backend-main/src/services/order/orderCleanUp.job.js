import cron from "node-cron";
import Order from "./order.schema.js";
import Card from "../card/card.schema.js";

async function cleanUpOrder() {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const reservedOrders = await Order.find({
      status: "RESERVED",
      createdAt: { $lt: fiveMinutesAgo },
    });
    if (!reservedOrders.length) {
      console.log("No reserved orders found");
      return;
    }
    for (const order of reservedOrders) {
      try {
        const card = await Card.findByIdAndUpdate(
          order.cardId,
          {
            $push: { cardCode: order.cardCode },
            status: true,
          },
          { new: true }
        );
        if (card) {
          console.log(`Updated card: ${card._id}`);
        } else {
          console.warn(`Card not found for order: ${order._id}`);
        }
      } catch (err) {
        console.error(`Failed to update card for order: ${order._id}`, err);
      }
    }
    const orderIds = reservedOrders.map((order) => order._id);
    const deleteResult = await Order.deleteMany({ _id: { $in: orderIds } });
    console.log(`Deleted ${deleteResult.deletedCount} reserved orders`);
  } catch (error) {
    console.log(error);
  }
}

export function orderCleanUpJob() {
  // Job runs in every 10 min
  cron.schedule("*/10 * * * *", () => {
    console.log("=> Order CleanUp job is scheduled");
    cleanUpOrder();
  });
}
