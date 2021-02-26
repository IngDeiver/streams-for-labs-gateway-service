// Managament File service end points
import apiAdapter from './adapter'
import { AxiosResponse, AxiosError } from 'axios'

const STORAGE_SERVICE_BASE_URL = process.env.STORAGE_SERVICE_BASE_URL || ""

const apiStorageService = apiAdapter(STORAGE_SERVICE_BASE_URL)

// prefixes
const STORAGE_SERVICE_PREFIX: string = 'photo';
const STORAGE_API_PREFIX: string = '/api';



import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute, IUser } from '../../interfaces';
import { HttpException } from '../../exceptions';

class PhotoServiceRouter implements IRoute {
  public router = Router();

  public pathIdParam = ':id';

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {

    // list Photos
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

  }
}
export default new PhotoServiceRouter().router;
