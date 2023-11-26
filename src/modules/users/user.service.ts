import { User } from './user.interface';
import UserModel from './user.model';

const createUserInDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromBD = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromBD = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select(
    '-_id userId username fullName age email isActive hobbies address ',
  );
  return result;
};

const updateUserFromDB = async (userId: number) => {
  const result = await UserModel.findByIdAndUpdate(userId, {
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
