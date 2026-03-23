import {Router} from 'express';
export const userauthRoutes=Router();

import { RegisteredUser } from '../Controllers/auth.controller';

userauthRoutes.post('/addUser',RegisteredUser);