import {Router} from 'express';
export const userauthRoutes=Router();

import { RegisteredUser,alreadyRegisteredUser } from '../Controllers/auth.controller';

userauthRoutes.post('/addUser',RegisteredUser);
userauthRoutes.post('/oldUser',alreadyRegisteredUser);