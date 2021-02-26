// Managament File service end points
import apiAdapter from './adapter'
import { AxiosResponse, AxiosError } from 'axios'
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
    this.router.get(`/`, (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = <IUser>req.user
      const author = user._id
      apiStorageService.get(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${author}`)
        .then((service_response: AxiosResponse) => {
          res.json(service_response.data)
        })
        .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    });

     // get file
     this.router.get(`/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = <IUser>req.user
      const author = user._id
      apiStorageService.get(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${req.path}/${author}`)
        .then((service_response:any) => {
          res.send(service_response.data)
        })
        .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    })

    // // Update file
    // this.router.put(`/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
    //   apiStorageService.put(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${req.path}`)
    //     .then((service_response: AxiosResponse) => {
    //       res.json(service_response.data)
    //     })
    //     .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    // })

    // Remove file
    this.router.delete(`/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = <IUser>req.user
      const author = user._id
      apiStorageService.delete(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${req.path}/${author}`)
        .then((service_response: AxiosResponse) => {
          res.json(service_response.data)
        })
        .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    })

    // Upload file
    this.router.post(`/`, upload.single('file'),
      (req: Request, res: Response, next: NextFunction) => {

        let formData = new FormData();
        const file = req.file
        const user: IUser = <IUser>req.user
        const author = user._id
        formData.append('file', file.buffer)


        console.log(formData);
        console.log("File: ", file);
        console.log("Headers: ", formData.getHeaders());
        

        apiStorageService.post(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${author}`, 
          {file:formData}, { headers: formData.getHeaders() })
          .then((service_response: AxiosResponse) => {
            res.json(service_response.data)
          })
          .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
      })
  }
}
export default new FileServiceRouter().router;
