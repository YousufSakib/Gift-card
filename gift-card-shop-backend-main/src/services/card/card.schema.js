import { model, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, default: null },
  cardValue: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  cardCode: { type: [String] },
  status: { type: Boolean, default: true }
}, { timestamps: true });

schema.plugin(paginate);

schema.pre('save', function (next) {
  if (this.cardCode.length === 0) {
    this.status = false;
  }
  next();
});

schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};

export default model('Card', schema);
