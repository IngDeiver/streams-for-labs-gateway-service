import { Router } from 'express';
import UserRouter from './user.route';
import AdminRouter from './admin.route';
import passport from 'passport'
import UserController  from '../controller/UserController';

const router = Router();
const prefix: string = '/api';

router.use(`${prefix}/user`, passport.authenticate('oauth-bearer', { session: false }), UserRouter);
router.use(`${prefix}/admin/login`, (req, res, next) => UserController.authAdmin(req, res, next));
router.use(`${prefix}/admin`, passport.authenticate('jwt', { session: false }), AdminRouter);

export default router;
