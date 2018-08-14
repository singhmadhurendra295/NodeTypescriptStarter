import * as express from "express";
import * as logger from 'morgan';
import * as path from 'path';
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import userRouter from "./routes/user"
const auth = require("./auth/strategy").default;
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./../swagger/swagger.json');



class App {
    constructor() {
        this.app = express();
        this.config();
        this.prepareStatic();
        this.setViewEngine();
        this.routes();
    }
    public app: express.Application;

    // This serves everything in `static` as static files
    private prepareStatic(): void {
        this.app.use(express.static(path.join(__dirname, "/../static/")));
    }

    // Sets up handlebars as a view engine
    private setViewEngine(): void {
        this.app.set("view engine", "hbs");
        this.app.set("views", path.join(__dirname, "/../src/views"));
    }

    private config(): void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        //this.app.use(auth.initialize());
        // this.app.all("*", (req, res, next) => {
        //     //if (req.path.includes(process.env.API_BASE + "login")) return next();    
        //     return auth.authenticate((err, user, info) => {
        //         if (err) { return next(err); }
        //         if (!user) {
        //             if (info.name === "TokenExpiredError") {
        //                 return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
        //             } else {
        //                 return res.status(401).json({ message: info.message });
        //             }
        //         }
        //         this.app.set("user", user);
        //         return next();
        //     })(req, res, next);
        // });
        //this.app.use(passport.session());
    }

    private routes(): void {
        const router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                message: 'Hello World!'
            })
        });

        router.post('/', (req: Request, res: Response) => {
            const data = req.body;
            res.status(200).send(data);
        });

        this.app.use('/', router)
        this.app.use('/api/v1/users', userRouter);
    }
}
export default new App().app;