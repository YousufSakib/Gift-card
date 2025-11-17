import { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new Schema(
  {
    txHash: { type: String },
    email: { type: String, required: true, trim: true },
    walletAddress: { type: String, trim: true },
    cardId: { type: Schema.Types.ObjectId, ref: "Card", required: true },
    cardCode: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    network: { type: String, enum: ["BEP", "TRC"] },
    status: { type: String, enum: ["RESERVED", "COMPLETED"] },
    paymentUrl: { type: String },
    qrCodeText: { type: String },
    nowPaymentStatus: { type: String },
  },
  { timestamps: true }
);

schema.plugin(paginate);

schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

export default model("Order", schema);
