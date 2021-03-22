// Managament File service end points
import apiAdapter from './adapter'
import { AxiosError } from 'axios'
import http from 'http'

const VIDEO_SERVICE_BASE_URL  = process.env.VIDEO_SERVICE_BASE_URL  || ""



// prefixes
const VIDEO_SERVICE_PREFIX: string = 'video/download';
const VIDEO_API_PREFIX: string = '/api';



import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../../interfaces';
import { HttpException } from '../../exceptions';

class VideoServiceRouter implements IRoute {
  public router = Router();

  public pathIdParam = ':id';

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {
     // download Video
     this.router.get(`/${this.pathIdParam}`, (req: Request, res: Response, next: NextFunction) => {
        http.get(`${VIDEO_SERVICE_BASE_URL}${VIDEO_API_PREFIX}/${VIDEO_SERVICE_PREFIX}${req.path}`, 
        (videoChunk) => {
          if(videoChunk.statusCode !== 200){
            res.set({
              'content-type':'application/json'
            })
            return next(new HttpException(videoChunk.statusCode || 500, "Error"))
          
          }else {
            videoChunk.pipe(res)
          }
          
        }); 
      })
  }
}
export default new VideoServiceRouter().router;
