import { Document } from 'mongoose';

import { TOrder } from './order.interface';
import UserModel from '../users/user.model';

interface OrderDocument extends Document, TOrder {
  orders: TOrder[];
}

const addProductToOrderInDB = async (userId: number, data: TOrder) => {
  if (await UserModel.isUserExist(userId)) {
    const user = (await UserModel.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        $push: {
          orders: {
            productName: data.productName,
            price: data.price,
            quantity: data.quantity,
          },
        },
      },
      { new: true, upsert: true },
    )) as OrderDocument;
    if (!user) {
      throw new Error('Failed to create or update the order.');
    }

    return user.orders.slice(-1)[0];
  } else {
    throw new Error("User doesn't exist");
  }
};

const getAllOrdersForAUserInDB = async (userId: number) => {
  if (await UserModel.isUserExist(userId)) {
    const user = await UserModel.findOne({ userId: userId });
    if (!user) {
      throw new Error('Failed to fetch orders.');
    }
    return user.orders;
  } else {
    throw new Error("User doesn't exist");
  }
};

const calculateTotalPriceForAllOrdersForAUserInDB = async (userId: number) => {
  if (await UserModel.isUserExist(userId)) {
    const user = await UserModel.findOne({ userId: userId });
    if (!user) {
      throw new Error('Failed to fetch orders.');
    }
    const orders = user.orders || [];

    const totalPrice = orders.reduce((total, order) => {
      return total + order.price * order.quantity;
    }, 0);

    return totalPrice;
  } else {
    throw new Error("User doesn't exist");
  }
};

export const OrderServices = {
  addProductToOrderInDB,
  getAllOrdersForAUserInDB,
  calculateTotalPriceForAllOrdersForAUserInDB,
};
