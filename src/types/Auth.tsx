import User from './User';
import Token from './Token';

type Auth = {
    user: User,
    token: Token,
    loginWith: '' | 'email' | 'google',
};

export default Auth;