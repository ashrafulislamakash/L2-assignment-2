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

const getSingleUserFromBD = async (id: number) => {
  const result = await UserModel.findOne({ id });
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserFromBD,
  getSingleUserFromBD,
};
