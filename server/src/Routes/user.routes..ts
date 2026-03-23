import {Router} from 'express';
export const userauthRoutes=Router();

import { isUserLoggedIn } from '../middleware/auth.middleware';

import { RegisteredUser,alreadyRegisteredUser,verifyOtp } from '../Controllers/auth.controller';

userauthRoutes.post('/addUser',RegisteredUser);
userauthRoutes.post('/oldUser',alreadyRegisteredUser);
// userauthRoutes.post('/oldUser/:email/:password',alreadyRegisteredUser);//pass by params
userauthRoutes.post('/verifyOtp',isUserLoggedIn,verifyOtp);
