import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const { value } = userValidationSchema.validate(user);

    const result = await UserServices.createUserInDB(value);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromBD();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: err,
    });
  }
};

// const getSingleUser = async (req: Response, res: Response) => {
//   try {
//     const userId = req.params;
//     const result = await UserServices.getSingleUserFromBD(userId);
//     res.status(200).json({
//       success: true,
//       message: 'User fetched successfully!',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(404).json({
//       success: false,
//       message: err.message || 'User not found!',
//       error: err,
//     });
//   }
// };

export const UserControllers = {
  createUser,
  getAllUsers,
  // getSingleUser,
};
