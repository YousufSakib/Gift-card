import { sendOtp, verifyOtp } from "./client.entity";

export default function client() {
  /**
   * POST /client/send-otp
   * @description this route is used to send otp to client.
   * @response {Object} 200 - the client.
   */
  this.route.post("/client/send-otp", sendOtp(this));

  /**
   * POST /client/verify-otp
   * @description this route is used to verify otp.
   * @response {Object} 200 - the client.
   */
  this.route.post("/client/verify-otp", verifyOtp(this));
}
