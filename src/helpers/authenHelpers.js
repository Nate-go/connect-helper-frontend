import Cookies from "js-cookie";
import { authenticationEndpoints } from '@/apis';
import api from "@/apis/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(base64);
}

export const getAuthentication = () => {
    const auth = Cookies.get('auth');

    if(auth !== undefined) {
        return JSON.parse(auth);
    }

    return null;
};

export const setAuthentication =  (auth) => {
    Cookies.set("auth", JSON.stringify(auth));
};

export const signOut = () => {
    Cookies.remove("auth");
}

export const refreshToken = (rememberToken) => {
    console.log('insiiiii');
    return api.post(authenticationEndpoints.refresh, {
        'remember_token': rememberToken
    });
}
