import { ethers } from "ethers";
import fetch from "node-fetch";
import { TronWeb } from "tronweb";
import { decryptCardCode } from "../../utils/encryption.js";
import Card from "../card/card.schema.js";
import { sendCodeViaMail } from "./order.function.js";
import Order from "./order.schema.js";

const tronWeb = new TronWeb({ fullHost: process.env.TRON_HOST });

// const verifyTronTxSuccess = async (txHash) => {
//   const tx = await tronWeb.trx.getTransaction(txHash);

//   console.log('tx: ', tx);
//   if (!tx) throw new Error('Transaction not found');
//   const result = tx.ret?.[0]?.contractRet;
//   if (result !== 'SUCCESS') throw new Error('Transaction failed');
//   return true;
// };

const verifyTronTxSuccess = async (txHash) => {
  const start = Date.now();
  const timeout = 5 * 60 * 1000; // 5 minutes
  const interval = 5000; // 5 seconds

  console.log(" Fetching transaction...");
  console.log(" TX Hash:", txHash);
  const tx = await tronWeb.trx.getTransaction(txHash);
  console.log(" Transaction details:", tx);
  if (!tx) {
    console.error(" Transaction not found");
    throw new Error("Transaction not found");
  }

  const result = tx.ret?.[0]?.contractRet;
  console.log(" Contract return result:", result);
  if (result !== "SUCCESS") {
    console.error(" Transaction failed at contract level");
    throw new Error("Transaction failed");
  }

  console.log(" Waiting for confirmation...");
  while (Date.now() - start < timeout) {
    const receipt = await tronWeb.trx.getTransactionInfo(txHash);
    console.log(" Transaction receipt:", receipt);

    if (receipt && receipt.blockNumber && receipt.blockNumber > 0) {
      console.log(" Transaction confirmed in block:", receipt.blockNumber);
      return true;
    }
    const tweenty_seconds = 20000;
    if (Date.now() - start > tweenty_seconds) {
      return true;
    }
    console.log(" Not yet confirmed, retrying in 5s...");
    await new Promise((res) => setTimeout(res, interval));
  }

  console.error(" Transaction not confirmed within timeout");
  throw new Error("Transaction not confirmed within timeout");
};

/**
 * POST /order/reserve
 * @milnify
 * @description Reserves a card for a user by creating an order with status "RESERVED".
 *              Validates required fields, checks card availability, and prevents duplicate reservations.
 *              Decrypts and returns the reserved card code in the response.
 * @body {String} email - Email of the user reserving the card.
 * @body {String} walletAddress - Wallet address of the user.
 * @body {ObjectId} cardId - ID of the card to reserve.
 * @body {Number} amountPaid - Amount paid for the reservation.
 * @body {String} network - Blockchain network used for the transaction.
 * @response {Object} 201 - Reserved order with decrypted card code.
 * @response {Object} 200 - If an order is already reserved for the user.
 * @response {Object} 400 - If required fields are missing or card is unavailable.
 * @response {Object} 404 - If the card is not found.
 * @response {Object} 500 - Internal server error.
 */
export const reserveOrder =
  ({ db }) =>
  async (req, res) => {
    try {
      console.log("Reserve Order Request Body:", req.body);
      const { email, cardId, amountPaid, network } = req.body;
      if (!email || !cardId) {
        //walletAddress is not mendetory
        return res.status(400).json({ message: "All fields are required" });
      }

      console.log(
        `called reserve order, email: ${email}, cardId: ${cardId} amountPaid: ${amountPaid}, network: ${network}`
      );

      const card = await db.findOne({ table: Card, key: { id: cardId } });
      console.log("Card Found:", card);
      if (!card) return res.status(404).json({ message: "Card not found" });
      if (!card.status || card.cardCode.length === 0)
        return res.status(400).json({ message: "Card is not available" });

      const reservedOrder = await db.findOne({
        table: Order,
        key: { email, cardId, status: "RESERVED" }, //removed walletAddress from it , because email is like primary key
      });
      if (reservedOrder) {
        console.log(
          "This card are already reserved for this user:",
          reservedOrder
        );
        return res
          .status(200)
          .json({ message: "Order is already reserved", data: reservedOrder });
      }

      const encryptedCardCode = card.cardCode[0];
      const decryptedCardCode = decryptCardCode(encryptedCardCode);

      const newCardCodes = card.cardCode.slice(1);
      if (newCardCodes.length == 0) card.status = false;

      await Card.findByIdAndUpdate(card._id, {
        cardCode: newCardCodes,
      });

      const order = await db.create({
        table: Order,
        key: {
          email,
          cardId,
          cardCode: encryptedCardCode,
          amountPaid,
          // network,
          status: "RESERVED",
        },
      });

      const response = {
        message: "Order reserved successfully",
        data: { ...order.toObject(), cardCode: decryptedCardCode },
      };

      console.log("Reserve Order Response:", response);

      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    }
  };

/**
 * GET /order/payment-url
 * @description generate payment url
 * Returns the payment url
 * @body {String} invoiceId - nowpayments.io invoice id
 * @response {Object} 201 - Newly created order
 * @response {Object} 400 - Missing fields or card not available
 * @response {Object} 404 - Card not found
 * @response {Object} 500 - Internal server error
 */

export const getPaymentURL =
  ({ db, settings }) =>
  async (req, res) => {
    try {
      const { orderId, network } = req.query;
      if (!orderId)
        return res.status(400).send({ message: "Order Id is required" });

      const order = await db.findOne({
        table: Order,
        key: { id: orderId, populate: { path: "cardId" } },
      });
      if (!order)
        return res
          .status(404)
          .send({ message: "Order not found or invalid orderId" });

      console.log(
        `Generating payment URL for Order ID: ${orderId}  on ${network} network`
      );

      if (!order.paymentUrl || order.network !== network) {
        order.network = network;
        await order.save();

        const invoiceRes = await fetch(
          "https://api.nowpayments.io/v1/invoice",
          {
            method: "POST",
            headers: {
              "x-api-key": settings.NOW_PAYMENTS_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price_amount: order.amountPaid,
              price_currency: "usd",
              order_id: order.id,
              order_description: `OrderId: ${order.id}, Customer Email: ${order.email}, Card name: ${order.cardId.name} `,
              ipn_callback_url: `${settings.BACKEND_DOMAIN}/api/order/ipn-callback`,
              success_url: "https://nowpayments.io",
              cancel_url: "https://nowpayments.io",
            }),
          }
        );

        const data = await invoiceRes.json();

        console.log("Invoice response data:", data);

        const paymentRes = await fetch(
          "https://api.nowpayments.io/v1/invoice-payment",
          {
            method: "POST",
            headers: {
              "x-api-key": settings.NOW_PAYMENTS_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              iid: data.id,
              pay_currency: order.network === "BEP" ? "bnbbsc" : "trx",
              //   pay_currency: "sol",
              order_description: data.order_description,
              customer_email: order.email,
            }),
          }
        );

        const paymentData = await paymentRes.json();

        console.log("Payment response:", paymentData);

        if (!paymentData.payment_id)
          return res
            .status(paymentData.statusCode)
            .send({ message: paymentData.message });
        const paymentUrl = `https://nowpayments.io/payment?iid=${data.id}&paymentId=${paymentData.payment_id}`;
        order.paymentUrl = paymentUrl;
        order.nowPaymentStatus = "waiting";

        const qrCodeText =
          order.network === "BEP"
            ? `ethereum:${paymentData.pay_address}?amount=${paymentData.pay_amount}&chainId=56`
            : `tron:${paymentData.pay_address}?amount=${paymentData.pay_amount}`;

        order.qrCodeText = qrCodeText;

        await order.save();

        console.log("Sending", {
          message: "Success",
          data: order,
        });

        return res.status(200).send({ message: "Success", data: order });
      } else {
        return res.status(200).send({ message: "Success", data: order });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    }
  };

/**
 * POST /order/ipn-callback
 * @description generate payment url
 * Returns the payment url
 * @body {String} invoiceId - nowpayments.io invoice id
 * @response {Object} 201 - Newly created order
 * @response {Object} 400 - Missing fields or card not available
 * @response {Object} 404 - Card not found
 * @response {Object} 500 - Internal server error
 */
export const ipnCallBack =
  ({ db, mail }) =>
  async (req, res) => {
    try {
      const { payment_status, order_id } = req.body;

      console.log("IPN Callback Received:", req.body);

      if (order_id) {
        const order = await db.findOne({
          table: Order,
          key: {
            id: order_id,
            populate: {
              path: "cardId",
              select: "_id name image cardValue price",
            },
          },
        });
        if (order) {
          console.log({ payment_status });
          order.nowPaymentStatus = payment_status;
          await order.save();

          if (payment_status === "finished") {
            order.status = "COMPLETED";
            await order.save();
            const decryptedCardCode = decryptCardCode(order.cardCode);
            order.cardCode = decryptedCardCode;
            sendCodeViaMail({ mail, order: order });
          }
        }
      }
      return res.status(200).send({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    }
  };

/**
 * POST /order/:id
 * @description generate payment url
 * Returns the payment url
 * @body {String} invoiceId - nowpayments.io invoice id
 * @response {Object} 201 - Newly created order
 * @response {Object} 400 - Missing fields or card not available
 * @response {Object} 404 - Card not found
 * @response {Object} 500 - Internal server error
 */
export const orderDetails =
  ({ db }) =>
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).send({ message: "Bad request" });
      let order = await db.findOne({
        table: Order,
        key: {
          id,
          populate: {
            path: "cardId",
            select: "_id name image cardValue price",
          },
        },
      });
      if (!order) return res.status(404).send({ message: "Invalid order is" });
      const data = {};
      if (order.nowPaymentStatus === "finished") {
        const decryptedCardCode = decryptCardCode(order.cardCode);
        data.cardCode = decryptedCardCode;
        data.card = order.cardId;
      }
      order = order.toObject();
      //   console.log("Order Details Response:", { ...order, ...data });
      delete order.cardId;
      delete order.cardCode;
      return res
        .status(200)
        .send({ message: "Success", data: { ...order, ...data } });
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    }
  };

/**
 * POST /order
 * @description Creates a new order after validating required fields and updating card inventory.
 *              Pulls one cardCode from the Card, saves it in Order, and updates Card accordingly.
 * @body {String} txHash - Transaction hash from blockchain
 * @body {String} email - Email of the buyer
 * @body {String} walletAddress - Wallet address of the buyer
 * @body {ObjectId} cardId - Reference to the Card
 * @body {Number} amountPaid - Amount paid by the user
 * @body {String} network - Blockchain network used for transaction (BSC or TRC)
 * @response {Object} 201 - Newly created order
 * @response {Object} 400 - Missing fields or card not available
 * @response {Object} 404 - Card not found
 * @response {Object} 500 - Internal server error
 */

export const createOrder =
  ({ db, mail }) =>
  async (req, res) => {
    try {
      const { txHash, orderId, network } = req.body;
      if (!txHash || !orderId) {
        return res.status(400).send("All fields are required");
      }
      if (network === "TRC") {
        await verifyTronTxSuccess(txHash);
      } else {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const transaction = await provider.getTransactionReceipt(txHash);
        if (!transaction || transaction.status !== 1) {
          return res
            .status(400)
            .json({ status: 400, message: "transaction failed or not found" });
        }
      }

      const orderRes = await db.update({
        table: Order,
        key: {
          id: orderId,
          body: { txHash, network, status: "COMPLETED" },
          populate: {
            path: "cardId",
            select: "_id name image cardValue price",
          },
        },
      });

      console.log("Order Created:", orderRes);

      const decryptedCardCode = decryptCardCode(orderRes.cardCode);

      const { __v, updatedAt, cardId, cardCode, ...rest } = orderRes.toObject();
      const order = { ...rest, cardCode: decryptedCardCode, card: cardId };

      const response = {
        message: "Order placed successfully",
        data: order,
      };

      await mail({
        receiver: order.email,
        subject: "GIFTCARD - Order Confirmation",
        body: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear User,</p>

        <p>Thank you for your purchase from <strong>GIFTCARD</strong>. Below are the details of your gift card order:</p>

        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${order.card.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Code</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${order.cardCode}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Value</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">$${order.card.cardValue}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Card Price</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">$${order.card.price}</td>
          </tr>
        </table>

        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>

        <p>Best regards,<br/>
        <strong>GIFTCARD</strong> Team</p>
      </body>
    </html>
  `,
        type: "html",
      });

      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    }
  };

// export const createOrder =
//   ({ db }) =>
//   async (req, res) => {
//     try {
//       const { txHash, email, walletAddress, cardId, amountPaid, network } =
//         req.body;
//       if (
//         !txHash ||
//         !email ||
//         !walletAddress ||
//         !cardId ||
//         !amountPaid ||
//         !network
//       ) {
//         return res.status(400).send("All fields are required");
//       }

//       const card = await db.findOne({ table: Card, key: { id: cardId } });
//       if (!card) return res.status(404).send("Card not found");
//       if (!card.status || card.cardCode.length === 0)
//         return res.status(400).send("Card is not available");

//       const encryptedCardCode = card.cardCode[0];
//       const decryptedCardCode = decryptCardCode(encryptedCardCode);

//       card.cardCode.shift();
//       if (card.cardCode.length == 0) card.status = false;
//       await db.save(card);

//       const order = await db.create({
//         table: Order,
//         key: {
//           txHash,
//           email,
//           walletAddress,
//           cardId,
//           cardCode: encryptedCardCode,
//           amountPaid,
//           network,
//         },
//       });
//       const response = { ...order.toObject(), cardCode: decryptedCardCode };
//       res.status(201).send(response);
//     } catch (error) {
//       console.log(error);
//       cardCode;
//       res.status(500).send("Something went wrong.");
//     }
//   };

/**
 * GET /order/all
 * @description Fetches all orders with pagination, sorted by creation date in descending order.
 * @query {Number} page - Optional. Page number for pagination. Defaults to 1.
 * @query {Number} limit - Optional. Number of orders per page. Defaults to 10.
 * @response {Array} 200 - List of orders.
 * @response {Object} 500 - Internal server error.
 */
export const getAllOrders =
  ({ db }) =>
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const status = req.qurey?.status;

      const filters = {};

      if (status) {
        filters.status = status;
      }

      const orders = await Order.paginate(filters, {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: {
          path: "cardId",
          select: "_id name image cardValue price",
        },
      });

      orders.docs = orders.docs.map((o) => {
        const { __v, updatedAt, cardId, cardCode, ...rest } = o.toObject();
        const decryptedCardCode = decryptCardCode(cardCode);
        return { ...rest, cardCode: decryptedCardCode, card: cardId };
      });

      res.status(200).send(orders);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };

/**
 * GET /order/summary
 * @description Retrieves order and card statistics including total number of orders, total income from all orders, total number of cards and incomeChangePercent.
 * @response {Object} 200 - { totalOrders: Number, totalIncome: Number, totalCards: Number, incomeChangePercent: Number }
 * @response {Object} 500 - Internal server error.
 */
export const getSummary =
  ({ db }) =>
  async (req, res) => {
    try {
      const [totalOrders, totalCards] = await Promise.all([
        Order.countDocuments({ status: "COMPLETED" }),
        Card.countDocuments(),
      ]);

      const totalIncomeObj = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]);

      const totalIncome = totalIncomeObj[0]?.total || 0;

      const currentMonthStart = new Date();
      currentMonthStart.setDate(1);
      const currentMonthEnd = new Date(currentMonthStart);
      currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);
      currentMonthEnd.setDate(0);

      const thisMonthIncomeObj = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
          },
        },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]);

      const thisMonthIncome = thisMonthIncomeObj[0]?.total || 0;

      const lastMonthStart = new Date();
      lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
      lastMonthStart.setDate(1);
      const lastMonthEnd = new Date(lastMonthStart);
      lastMonthEnd.setMonth(lastMonthEnd.getMonth() + 1);
      lastMonthEnd.setDate(0);

      const lastMonthIncomeObj = await Order.aggregate([
        { $match: { createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]);

      const lastMonthIncome = lastMonthIncomeObj[0]?.total || 0;

      let incomeChangePercent = 0;
      if (lastMonthIncome !== 0) {
        incomeChangePercent =
          ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
      }

      res.status(200).send({
        totalOrders,
        totalIncome,
        totalCards,
        incomeChangePercent,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };

/**
 * GET /income/overview
 * @description Fetches the income overview for the given time period (last 15 days, this month, or last month).
 * @query {String} period - The time period for income overview. Options: 'last15days', 'thisMonth', 'lastMonth'. Default is 'last15days'.
 * @response {Array} 200 - Day-wise income for the requested period.
 * @response {Object} 500 - Internal server error.
 */
export const getIncomeOverview =
  ({ db }) =>
  async (req, res) => {
    try {
      const period = req.query.period || "last15days";
      let startDate;
      let endDate = new Date();

      switch (period) {
        case "last15days":
          startDate = new Date();
          startDate.setDate(endDate.getDate() - 14);
          endDate.setDate(endDate.getDate());
          break;

        case "thisMonth":
          startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 2);
          endDate.setDate(endDate.getDate() + 1);
          break;

        case "lastMonth":
          startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth() - 1,
            2
          );
          endDate = new Date(endDate.getFullYear(), endDate.getMonth());
          break;

        default:
          startDate = new Date();
          startDate.setDate(endDate.getDate() - 14);
          endDate.setDate(endDate.getDate());
      }

      const incomeData = await Order.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            totalIncome: { $sum: "$amountPaid" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      let result = [];
      const totalDays =
        Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;

      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const formattedDate = currentDate.toISOString().split("T")[0];
        const dayIncome = incomeData.find((item) => item._id === formattedDate);

        result.push({
          date: formattedDate,
          totalIncome: dayIncome ? dayIncome.totalIncome : 0,
        });
      }

      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };

/**
 * DELETE /order/:id
 * @description Deletes an order by its ID.
 * @param {String} id - The ID of the order to delete.
 * @response {Object} 200 - Success message.
 * @response {Object} 404 - Order not found.
 * @response {Object} 500 - Internal server error.
 */
export const deleteOrder =
  ({ db }) =>
  async (req, res) => {
    try {
      const { id } = req.params;
      const order = await db.remove({ table: Order, key: { _id: id } });

      if (!order) return res.status(404).send({ message: "Order not found" });

      res.status(200).send({ message: "Order deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  };
