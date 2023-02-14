import express from 'express';
import * as userController from './users.controller.js';


const userRouter = express.Router();

userRouter.post('/users/signup', userController.singup);
userRouter.post('/users/signin' , userController.signIn);
userRouter.delete('/' , userController.deleteUser);
userRouter.put('/' , userController.updateUser);
userRouter.get('/lessThan30' , userController.getUserStartWithACharAndAgeLessThan30);
userRouter.post('/usersBetweenTwoIds' , userController.getAllUserBetweenThisIds);
userRouter.get('/' , userController.getAllUsers);


export default userRouter;