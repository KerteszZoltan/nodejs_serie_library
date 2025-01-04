import crypto from 'crypto';

export const random = () => crypto.randomBytes(128).toString('base64');
const SECRET = 'your-secret-key';

export const authentication = (password: string, salt: string) => {
    return crypto.createHmac('sha256',[salt, password].join('/')).update(SECRET).digest('hex');
};