import Cookies from "js-cookie";

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(base64);
}

export const getAuthentication = () => {
    const auth = Cookies.get('auth');
    const authen = auth ? JSON.parse(auth) : null;

    if(!authen) {
        return null;
    }
    
    const decodedToken = parseJwt(authen.access_token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
        Cookies.remove("auth");
        return null;
    }
    return authen;
};

export const setAuthentication =  (auth) => {
    Cookies.set("auth", JSON.stringify(auth));
};

export const signOut = () => {
    Cookies.remove("auth");
}