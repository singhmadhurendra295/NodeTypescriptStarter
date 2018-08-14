import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./../models/user";
import { IUser } from "../interfaces/user";
import { AuthService } from './auth';

class AuthStrategy {
  
  //class JwtStrategy extends Strategy {
  // constructor(private readonly authService: AuthService) {
  //   super(
  //     {
  //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       passReqToCallback: true,
  //       secretOrKey: 'secret',
  //     },
  //     async (req, payload, next) => await this.verify(req, payload, next)
  //   );
  //   passport.use(this);
  // }

  // public async verify(req, payload, done) {
  //   const isValid = await this.authService.validateUser(payload);
  //   if (!isValid) {
  //     return done('Unauthorized', false);
  //   }
  //   done(null, payload);
  // }

  // public initialize = () => {
  //   passport.use("jwt", this.getStrategy());
  //   return passport.initialize();
  // }

  // public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

  // private getStrategy = (): Strategy => {
  //   const params = {
  //     secretOrKey: process.env.JWT_SECRET || 'secret',
  //     jwtFromRequest: ExtractJwt.fromAuthHeader(),
  //     passReqToCallback: true
  //   };

  //   return new Strategy(params, (req, payload: any, done) => {
  //     User.findOne({ "username": payload.username }, (err, user) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       if (user === null) {
  //         return done(null, false, { message: "The user in the token was not found" });
  //       }
  //       return done(null, { _id: user._id, username: user.email });
  //     });
  //   });
  // }


}
export default new AuthStrategy();