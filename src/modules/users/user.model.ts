import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { User } from './user.interface';
import config from '../../app/config';

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: String, enum: ['active', 'inactive'], required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
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
  doc.password = '';

  next();
});

const UserModel = model<User>('UserModel', userSchema);

export default UserModel;
