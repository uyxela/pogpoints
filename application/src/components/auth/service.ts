const axios = require('axios');
const url = require('url');
import env from "../data/env.json";
import {getItem, setItem, deleteItem} from '../data/Store';

const {client_id, redirect_uri, response_type, scope} = env.twitch;

let accessToken: String|null = getItem('accessToken');
let userID: String|null = null;

export function getAccessToken() {
    return accessToken;
}

export function getUserID() {
    return userID;
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