import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

import config from '../../app/config';
import { TUser, UserModel } from './user.interface';
import { OrderSchema } from '../order/order.model';

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  // isActive: { type: String, enum: ['active', 'inactive'], required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: {
    type: [OrderSchema],
  },
});

// pre save hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post sae middleware
userSchema.post('save', function (doc, next) {
  // doc.password = '';
  doc.set('password', undefined);

  next();
});

// Pre Update Middleware
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update && 'password' in update && update.password) {
    // Hash the password before updating
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  next();
});

// Post Update Middleware
userSchema.post('findOneAndUpdate', async function (result, next) {
  // If 'result' is an object and 'password' exists, remove it
  if (result && typeof result === 'object' && 'password' in result) {
    result.password = undefined;
  }
  result.isDeleted = undefined;
  result._id = undefined;

  if (result.orders && result.orders.length === 0) {
    result.orders = undefined;
  }
  next();
});

// Query Middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExist = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};
const UserModel = model<TUser, UserModel>('UserModel', userSchema);

export default UserModel;
