import Cookies from "js-cookie";

export const getAuthentication = () => {
    return Cookies.get('auth');
};

export const setAuthentication =  (auth) => {
    Cookies.set("auth", JSON.stringify(auth));
};

export const getToken = () => {
    return Cookies.get('auth')?.token;
};

export const signOut = () => {
    Cookies.remove("auth");
}