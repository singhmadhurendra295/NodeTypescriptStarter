import { Router, Request, Response, NextFunction } from 'express';
import UserCtrl from './../controller/user';
import { IUser } from "../interfaces/user";
import { date } from 'gulp-util';
import passport from 'passport';
const users = {
    "name": "Madhurendra Singh"
}


class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }
    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(users);
    }
    public getOne(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: 'Hello World!'
        });
        // let query = parseInt(req.params.id);
        // let hero = users; //Heroes.find(hero => hero.id === query);
        // if (hero) {
        //     res.status(200)
        //         .send({
        //             message: 'Success',
        //             status: res.status,
        //             hero
        //         });
        // }
        // else {
        //     res.status(404)
        //         .send({
        //             message: 'No hero found with the given id.',
        //             status: res.status
        //         });
        // }
    }
    public createUser(req:Request,res:Response,next:NextFunction){
        console.log("post router" ,req.body);
        UserCtrl.createUser(<IUser>(req.body),(err,data)=>{
            if(err) res.send(err);
            res.send(data);
        });
    }

    public login(req:Request,res:Response,next:NextFunction){
        console.log("login",req.body);
        UserCtrl.login(req.body,(err,data)=>{
            if(err){
                res.status(401).json({ "message": "Invalid credentials", "errors": err });
            }else{
                res.status(200).json(data);
            }
        })
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/create',this.createUser);
        this.router.post('/login',this.login);
    }

}

const userRouter = new UserRouter();
userRouter.init();

export default userRouter.router;