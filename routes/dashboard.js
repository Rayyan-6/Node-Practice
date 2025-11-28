import express from 'express'
import { getDashboard } from '../controllers/dashboard.js';
import { requireRole } from '../middlewares/requireRole.js';
import { requireSignin } from '../middlewares/auth.js';


const router= express.Router();

router.get('/', requireSignin,requireRole('admin'),getDashboard)


export default router