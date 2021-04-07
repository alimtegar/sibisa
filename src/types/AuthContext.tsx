import Auth from './Auth';

type AuthContext = Auth & {
    setAuth: (data: Auth) => void,
    setAuthIsLoading: (data: boolean) => void,
    removeAuth: () => void,
    isLoading: boolean,
};

export default AuthContext;