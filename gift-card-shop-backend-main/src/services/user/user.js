import { auth } from "../middlewares";
import {
  getAll,
  login,
  logout,
  me,
  register,
  removeUser,
  resetPassword,
  sendOtp,
  updateOwn,
  userProfile,
  verifyOtp,
} from "./user.entity";

export default function user() {
  /**
   * POST /user
   * @description This route is used to create a user.
   * @response {Object} 200 - the new user.
   */
  this.route.post("/user", register(this));

  /**
   * POST /user/login
   * @description this route is used to login a user.
   * @response {Object} 200 - the user.
   */
  this.route.post("/user/login", login(this));

  /**
   * GET /user/me
   * @description this route is used to get user profile.
   * @response {Object} 200 - the user.
   */
  this.route.get("/user/me", auth, me(this));

  /**
   * POST /user/logout
   * @description this route is used to logout a user.
   * @response {Object} 200 - the user.
   */
  this.route.post("/user/logout", auth, logout(this));

  /**
   * GET /user
   * @description this route is used to used get all user.
   * @response {Object} 200 - the users.
   */
  this.route.get("/user", getAll(this));

  /**
   * GET user/profile/:id
   * @description this route is used to get a user profile by id.
   * @response {Object} 200 - the user.
   */
  this.route.get("/user/profile/:id", auth, userProfile(this));

  /**
   * PATCH ‘/user/me’
   * @description this route is used to update own profile.
   * @response {Object} 200 - the user.
   */
  this.route.patch("/user/me", auth, updateOwn(this));

  /**
   * DELETE ‘/user/:id’
   * @description this route is used to delete user profile.
   * @response {Object} 200 - the user.
   */
  this.route.delete("/user/:id", auth, removeUser(this));

  /**
   * POST /user/send-otp
   * @description this route is used to send otp to user.
   * @response {Object} 200 - the user.
   */
  this.route.post("/user/send-otp", sendOtp(this));

  /**
   * POST /user/verify-otp
   * @description this route is used to verify otp.
   * @response {Object} 200 - the user.
   */
  this.route.post("/user/verify-otp", verifyOtp(this));

  /**
   * POST /user/reset-password
   * @description this route is used to reset password.
   * @response {Object} 200 - the user.
   */
  this.route.post("/user/reset-password", resetPassword(this));
}
