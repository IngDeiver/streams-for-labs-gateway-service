import { Router } from 'express';
import UserRouter from './user.route';
import AdminRouter from './admin.route';
import passport from 'passport'
import UserController  from '../controller/UserController';

// services
import AdminServiceRouter from './gateway/admin.service'

const router = Router();
const prefix: string = '/api';

// --- Authorization layer ---
router.use(`${prefix}/user`, passport.authenticate('oauth-bearer', { session: false }), UserRouter);
router.use(`${prefix}/admin/login`, (req, res, next) => UserController.authAdmin(req, res, next));
router.use(`${prefix}/admin`, passport.authenticate('jwt', { session: false }), AdminRouter);

// ---- Redirect to services ---
router.use((req, res, next) => {
    console.log(`Redirect request to: ${req.url}`)
    next()
})

// admin service redirect
router.use(passport.authenticate('jwt', { session: false }), AdminServiceRouter);
export default router;
