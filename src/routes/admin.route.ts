import {
    NextFunction, Request, Response, Router,
  } from 'express';
  import { IRoute } from '../interfaces';
 
  
  
  /**
   *
   * Managament the routes of user
   * @category Routes
   * @class UserRouter
   * @implements {IRoute}
   */
  class AdminRouter implements IRoute {
    public router = Router();
  
    constructor() {
      this.createRoutes();
    }
  
    createRoutes(): void {
      this.router.post('/', (req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

    }
  }
  export default new AdminRouter().router;
  