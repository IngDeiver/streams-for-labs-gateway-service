// Managament File service end points
import apiAdapter from './adapter'
import { AxiosResponse, AxiosError } from 'axios'
import stream from 'stream'

const PHOTO_SERVICE_BASE_URL  = process.env.PHOTO_SERVICE_BASE_URL  || ""

const apiPhotoService = apiAdapter(PHOTO_SERVICE_BASE_URL )

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
      apiPhotoService.get(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${author}`)
        .then((service_response: AxiosResponse) => {
          res.json(service_response.data)
        })
        .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    });

     // get pthoto
    //  this.router.get(`/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
    //   const user: IUser = <IUser>req.user
    //   const author = user._id
    //   apiPhotoService.get(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${req.path}/${author}`)
    //     .then((service_response:any) => {
    //       const photo = service_response.data
    //       const buffer = Buffer.from(photo.image, "base64")
          
    //       const readStream = new stream.PassThrough();
    //       readStream.end(buffer);
          
    //       res.writeHead(200, {
    //           "Content-disposition": "attachment; filename=" + photo.name,
    //           "Content-Type": "application/octet-stream",
    //           "Content-Length": buffer.length
    //       });
    //       res.end(buffer);
    //     })
    //     .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    // })

     // Remove photo
     this.router.delete(`/`, (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = <IUser>req.user
      const author = user._id
      const filesToRemove = req.body.files
      console.log("Resend: ", filesToRemove);
      apiPhotoService.delete(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/${author}`,
      {data: {files: filesToRemove}})
        .then((service_response: AxiosResponse) => {
          res.json(service_response.data)
        })
        .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    })

     // Share photo
    this.router.post(`/share`, (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = <IUser>req.user
      const author = user._id

      apiPhotoService.post(`${STORAGE_API_PREFIX}/${STORAGE_SERVICE_PREFIX}/share/${author}`, 
      {...req.body}, { headers: req.headers })
      .then((service_response: AxiosResponse) => {
        res.sendStatus(service_response.status)
      })
      .catch((err: AxiosError) => next(new HttpException(err.response?.status || 500, err.message)))
    })


  }
}
export default new PhotoServiceRouter().router;
