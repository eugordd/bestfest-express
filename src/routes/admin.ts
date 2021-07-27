import { Router } from 'express';

import { adminLogin, adminRegister } from '../controllers/admin';

const router = Router();

// POST /admin/login
router.post('/login', adminLogin);

// POST /admin/register
router.post('/register', adminRegister);

export default router;
