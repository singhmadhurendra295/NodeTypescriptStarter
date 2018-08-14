import * as jwt from 'jsonwebtoken';

export class AuthService {

    constructor() {
        this.createToken = this.createToken.bind(this);
    }

    async createToken(userData) {
        const expiresIn = 60 * 60, secretOrKey = 'secret';
        const user = { email: userData.email };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        // put some validation logic here
        // for example query user by id / email / username
        return true;
    }
}

//export default new AuthService();