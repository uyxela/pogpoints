const axios = require('axios');
const url = require('url');
import env from "../data/env.json";
import {getItem, setItem, deleteItem} from '../data/Store';

const {client_id, redirect_uri, response_type, scope} = env.twitch;
const apiUrl = env.url;

let accessToken: String|null = getItem('accessToken');

export function getAccessToken() {
    return accessToken;
}

export async function getUser() {
    let response;

    try {
        response = await axios.get(`https://api.twitch.tv/helix/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-Id": client_id
            }
        })
    } catch(error) {
        console.log(error);
        return null;
    }

    return response.data.data[0];
}

export function getAuthenticationURL() {
    return (
        `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`
    );
}

export function handleCallback(callbackURL: String) {
    const urlParts = url.parse(callbackURL, true);
    const result = urlParts.hash.substr(1).split('&')[0].split('=')[1];
    accessToken=result;
    setItem('accessToken', result);
    return urlParts.query;
}

export async function checkUser() {
    const userData = await getUser();
    const user = await axios.get(`${apiUrl}/user/${userData.id}`);
    if (user == null) {
        axios.get(`${apiUrl}/newUser/${userData.id}`);
    }
}

export const validateToken = async () => {
    let response;

    try {
        response = await axios.get(`https://id.twitch.tv/oauth2/validate`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
}

export const logOut = () => {
    deleteItem('accessToken');
    accessToken = null;
}