import jwt from "jsonwebtoken";

/**
 * This function is used to send otp to the user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the message of success otherwise it will throw an error.
 */
export const sendOtp =
  ({ db, settings, mail }) =>
  async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).send("Bad request");

      const otp = Math.floor(100000 + Math.random() * 900000);

      const token = jwt.sign(
        {
          email,
          otp,
        },
        settings.secret,
        { expiresIn: "5m" }
      );

      res.cookie("otpToken", token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
        ...(settings.useHTTP2 && {
          sameSite: "None",
          secure: true,
        }),
      });

      await mail({
        receiver: email,
        subject: "GIFTCARD - OTP Verification",
        body: `
      <p>Dear Customer,</p>
      <p>Your One-Time Password (OTP) for verification is: <strong>${otp}</strong></p>
      <p>This code is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br/>
      <p>Regards,<br/>GIFTCARD Team</p>
    `,
        type: "html",
      });

      res.status(200).send({ message: "Otp sent successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };

/**
 * This function is used to verify otp using encrypted token.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the message of success otherwise it will throw an error.
 */
export const verifyOtp =
  ({ db, settings }) =>
  async (req, res) => {
    try {
      const { otp } = req.body;
      if (!otp) return res.status(400).send("Bad request");

      const otpToken = req.cookies.otpToken;
      if (!otpToken) return res.status(401).send("Invalid OTP or Time expired");

      const decoded = jwt.verify(otpToken, settings.secret);

      if (decoded.otp !== Number(otp))
        return res.status(401).send("Invalid otp");

      const email = decoded.email;

      const token = jwt.sign(
        {
          email,
          otpVerified: true,
        },
        settings.secret,
        { expiresIn: "5m" }
      );

      res.cookie("otpToken", token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
        ...(settings.useHTTP2 && {
          sameSite: "None",
          secure: true,
        }),
      });

      res.status(200).send({ message: "Otp verified successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };
