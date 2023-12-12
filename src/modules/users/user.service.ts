/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import UserModel from './user.model';

const createUserInDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromBD = async () => {
  // const result = await UserModel.find();

  try {
    const result = await UserModel.aggregate([
      {
        $project: {
          password: 0,
          isActive: 0,
          hobbies: 0,
          orders: 0,
          userId: 0,

          _id: 0,
          __v: 0,
        },
      },
    ]);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getSingleUserFromBD = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select(
    '-_id userId username fullName age email isActive hobbies address ',
  );
  return result;
};

const updateUserFromDB = async (userId: number, userData: TUser) => {
  const result = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserFromBD,
  getSingleUserFromBD,
  updateUserFromDB,
  deleteUserFromDB,
};
