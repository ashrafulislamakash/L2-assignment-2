import { Model } from 'mongoose';

import { TOrder } from '../order/order.interface';

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: [string, string, string];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrder[];
}

// Custom Static Methods
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line
  isUserExist(userId: number): Promise<TUser | null>;
}
