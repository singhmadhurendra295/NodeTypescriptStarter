import { IUser } from "../interfaces/user";
import { Document, Schema, Model, model } from "mongoose";
import * as mongoose from 'mongoose';
import * as bcrypt from "bcryptjs";

export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export const UserSchema: Schema = new Schema({
    createdAt: Date,
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    mobile: Number,
    password: {
        type: String,
        required: true
    }
});
// UserSchema.pre("save",function(next) {
//     let user = this;
//     let now = new Date();
//     if (!user.createdAt) {
//         user.createdAt = now;
//     }
//     next();
// });
// UserSchema.pre("save",  function(next){
//     bcrypt.hash(this.password, 10, function(err, hash){
//         this.password = hash;
//         next();
//     });
// });
UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
UserSchema.methods.setPassword = function(password: string){
    bcrypt.hash(this.password, 10, function(err, hash){
        this.password = hash;
        return this.password;
    });
}
UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;
    return new Promise((resolve, reject) => {        
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

//export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
export const User = mongoose.model<IUserModel>('User', UserSchema);  

export const createUser = (user, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
          user.password = hash;
          user.save(callback);
      });
    });
  }