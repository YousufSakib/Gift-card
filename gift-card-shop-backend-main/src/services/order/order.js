import { auth } from "../middlewares";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getIncomeOverview,
  getPaymentURL,
  getSummary,
  ipnCallBack,
  orderDetails,
  reserveOrder,
} from "./order.entity";

export default function order() {
  /**
   * POST /order
   * @description Creates a new order entry after successful payment.
   * Required fields: txHash, email, walletAddress, cardId, amountPaid, network
   * Returns the created order with the assigned cardCode.
   * @response {Object} 200 - The newly created order object.
   * @response {Object} 400 - Bad request if data is missing or invalid.
   * @response {Object} 500 - Internal server error if something goes wrong.
   */
  this.route.post("/order/reserve", reserveOrder(this));

  /**
 * GET /order/invoice?orderId=122334532q32eweqd34&network=BEP
 * @description generate payment url
 * Returns the payment url
 * @response {Object} 200 - The newly created order object.
 * @response {Object} 400 - Bad request if data is missing or invalid.
 * @response {Object} 500 - Internal server error if something goes wrong.
 */
  this.route.get("/order/payment-url", getPaymentURL(this));




  /**
* POST /order/ipn-callback
* @description generate payment url
* Returns the payment url
* @response {Object} 200 - The newly created order object.
* @response {Object} 400 - Bad request if data is missing or invalid.
* @response {Object} 500 - Internal server error if something goes wrong.
*/
  this.route.post("/order/ipn-callback", ipnCallBack(this));



  /**
   * POST /order
   * @description Creates a new order entry after successful payment.
   * Required fields: txHash, email, walletAddress, cardId, amountPaid, network
   * Returns the created order with the assigned cardCode.
   * @response {Object} 200 - The newly created order object.
   * @response {Object} 400 - Bad request if data is missing or invalid.
   * @response {Object} 500 - Internal server error if something goes wrong.
   */
  this.route.post("/order", createOrder(this));

  /**
   * GET /order/all
   * @description Fetches all orders with pagination, sorted by creation date in descending order.
   * @query {Number} page - Optional. Page number for pagination. Defaults to 1.
   * @query {Number} limit - Optional. Number of orders per page. Defaults to 10.
   * @response {Array} 200 - List of orders.
   * @response {Object} 500 - Internal server error.
   */
  this.route.get("/order/all", auth, getAllOrders(this));

  /**
   * GET /order/summary
   * @description Retrieves order and card statistics including total number of orders, total income from all orders, total number of cards and incomeChangePercent.
   * @response {Object} 200 - { totalOrders: Number, totalIncome: Number, totalCards: Number, incomeChangePercent: Number }
   * @response {Object} 500 - Internal server error.
   */
  this.route.get("/order/summary", auth, getSummary(this));

  /**
   * GET /order/income-overview
   * @description Returns income overview for last 15 days, this month, or last month.
   * @query {String} range - Optional. Values: "last15days" (default), "thisMonth", "lastMonth".
   * @response {Array} 200 - List of daily income.
   * @response {Object} 500 - Internal server error.
   */
  this.route.get("/order/income-overview", auth, getIncomeOverview(this));

  /**
* GET /order/:id
* @description get order data
* Returns order data
* @response {Object} 200 - The newly created order object.
* @response {Object} 400 - Bad request if data is missing or invalid.
* @response {Object} 500 - Internal server error if something goes wrong.
*/
  this.route.get("/order/:id", orderDetails(this));

  /**
   * DELETE /order/:id
   * @description Deletes an order by its ID.
   * @param {String} id - The ID of the order to delete.
   * @response {Object} 200 - Success message.
   * @response {Object} 404 - Order not found.
   * @response {Object} 500 - Internal server error.
   */
  this.route.delete("/order/:id", auth, deleteOrder(this));
}
