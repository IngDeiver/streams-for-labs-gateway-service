// Managament File service end points
import apiAdapter from './adapter'
import { AxiosResponse, AxiosError } from 'axios'
import stream from 'stream'

const PHOTO_SERVICE_BASE_URL  = process.env.PHOTO_SERVICE_BASE_URL  || ""

const apiStorageService = apiAdapter(PHOTO_SERVICE_BASE_URL )

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

     // get pthoto
     this.router.get(`/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = <IUser>req.user
      const author = user._id
      apiStorageService.get(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${req.path}/${author}`)
        .then((service_response:any) => {
          const photo = service_response.data
          const attachmentHeader = service_response.headers['content-disposition']
          console.log(typeof(photo));
          console.log(photo);
          
          const buffer = Buffer.from(photo)
          console.log(buffer);
          
          const readStream = new stream.PassThrough();
          readStream.end(buffer);
          console.log(attachmentHeader);
          
          res.writeHead(200, {
              "Content-disposition": "attachment; filename=" + attachmentHeader.split("=")[1],
              "Content-Type": "application/octet-stream",
              "Content-Length": buffer.length
          });
          res.end(buffer);
        })
        .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    })

     // Remove photo
     this.router.delete(`/`, (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = <IUser>req.user
      const author = user._id
      const filesToRemove = req.body.files
      console.log("Resend: ", filesToRemove);
      apiStorageService.delete(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${author}`,
      {data: {files: filesToRemove}})
        .then((service_response: AxiosResponse) => {
          res.json(service_response.data)
        })
        .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    })

  }
}
export default new PhotoServiceRouter().router;
