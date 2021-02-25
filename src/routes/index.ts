import { Router } from 'express';
import passport from 'passport'
import { logger } from '../utils';
import UserController  from '../controller/UserController';

// services
import AdminServiceRouter from './gateway/admin.service'
import FileServiceRouter from './gateway/file.service'

const router = Router();
const prefix: string = '/api';

// --- Authorization layer ---
// login admin
router.use(`${prefix}/admin/login`, (req, res, next) => UserController.authAdmin(req, res, next));

// ---- Gateway layer (all request need are authenticated) ---
router.use((req, res, next) => {
    const params = req.params
    logger.info(`Redirect request to: ${req.url}${params.id ? "/" + params :''}`)
    next()
})

// admin service redirect
router.use(`${prefix}/admin`, passport.authenticate('jwt', { session: false }), AdminServiceRouter);
// file service redirect
router.use(`${prefix}/file`, passport.authenticate('oauth-bearer', { session: false }), FileServiceRouter);
export default router;
