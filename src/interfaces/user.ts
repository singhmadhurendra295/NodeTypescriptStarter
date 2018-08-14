import { Document } from 'mongoose';
export interface IUser extends Document{
    createdAt:string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    password:string;
    //setPassword(password: string): string;                                                                                                                                                                                                                                                            
    comparePassword(candidatePassword: string): Promise<boolean>;
}