// Managament File service end points
import apiAdapter from './adapter'
import { AxiosResponse, AxiosError} from 'axios'
import multer from 'multer'
const FormData = require('form-data');

const STORAGE_SERVICE_BASE_URL = process.env.STORAGE_SERVICE_BASE_URL || ""

const apiStorageService = apiAdapter(STORAGE_SERVICE_BASE_URL)

// prefixes
const STORAGE_SERVICE_PREFIX: string = 'file';
const STORAGE_API_PREFIX: string = '/api';

// multer config
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

import {
    NextFunction, Request, Response, Router,
} from 'express';
import { IRoute, IUser } from '../../interfaces';
import { HttpException } from '../../exceptions';

  class FileServiceRouter implements IRoute {
    public router = Router();
  
    public pathIdParam = ':id';
  
    constructor() {
      this.createRoutes();
    }
  
    createRoutes(): void {
  
      // list files
      this.router.get(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}`, (req: Request, res: Response, next: NextFunction) => {
        res.redirect(req.path)
      });
  
      // Update file
      this.router.put(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
        apiStorageService.put(req.path, req.body)
          .then((service_response: AxiosResponse) => {
              res.json(service_response.data)
          })
          .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
      })


       // Upload file
       this.router.post(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}`, upload.single('file'),
       (req: Request, res: Response, next: NextFunction) => {
         const formData = new FormData();
         const file = req.file

         formData.append('file', file)

         const user: IUser  = <IUser> req.user
         console.log("User: ", req.user);
         console.log("File: ", req.file);
       

         apiStorageService.post(req.path, {formData, user:user._id },{ headers: 
          {'content-type': 'multipart/form-data'} 
        })
          .then((service_response: AxiosResponse) => {
              res.json(service_response.data)
          })
          .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
      })
    }
  }
  export default new FileServiceRouter().router;
