import { User } from './../models/user';
import { IUser } from "../interfaces/user";
import {AuthService} from './../auth/auth'
class UserCtrl{

    private userData : IUser;    
    constructor(){
        this.createUser = this.createUser.bind(this);
    }
    
    async createUser(data:IUser,callback:(err:any ,data?:any) => void){
        console.log(data);
        try{
            const user = await User.create(data);
            callback(null,await new AuthService().createToken(user))
        }catch(err){
            callback(err);
        }      
    }

    async login(payload:any,callback:(err:any ,data?:any) => void){
        try {
            let user = await User.findOne({ "email": payload.email }).exec();
            if (user === null) throw "User not found";
            let success = await user.comparePassword(payload.password);
            if (success === false) throw "";
            //callback(null,Auth.genToken(user));            
        } catch (err) {
            callback(err);
        }
    }
    

}
export default new UserCtrl();