
import { Router } from 'express';
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../Controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/AuthMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats',
  [authorizePermissions('admin'),
    getApplicationStats,]);
router.patch('/update-user',upload.single('avatar'), validateUpdateUserInput, updateUser);
export default router;