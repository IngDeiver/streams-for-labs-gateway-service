// Managament admin service end points
import apiAdapter from './adapter'
import { AxiosResponse, AxiosError} from 'axios'
import '../../config/dotenv'

const ADMIN_SERVICE_BASE_URL = process.env.ADMIN_SERVICE_BASE_URL || ""

const apiAdminService = apiAdapter(ADMIN_SERVICE_BASE_URL)

// prefixes
const ADMIN_SERVICE_PREFIX: string = 'admin';
const ADMIN_API_PREFIX: string = '/api';

import {
    NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../../interfaces';
import { HttpException } from '../../exceptions';

  class AdminServiceRouter implements IRoute {
    public router = Router();
  
    public pathIdParam = ':id';
  
    constructor() {
      this.createRoutes();
    }
  
    createRoutes(): void {
  
      // list configs
      this.router.get(`${ADMIN_API_PREFIX}/${ADMIN_SERVICE_PREFIX}`, (req: Request, res: Response, next: NextFunction) => {
        res.redirect(req.path)
      });
  
      // Update config
      this.router.put(`${ADMIN_API_PREFIX}/${ADMIN_SERVICE_PREFIX}/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
        apiAdminService.put(req.path, req.body)
          .then((service_response: AxiosResponse) => {
              res.json(service_response.data)
          })
          .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
      })
  
    }
  }
  export default new AdminServiceRouter().router;
