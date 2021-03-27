const axios = require('axios');
const url = require('url');
import {twitch} from "../data/env.json";
import {getItem, setItem, deleteItem} from '../data/Store';

const {client_id, redirect_uri, response_type, scope} = twitch;

let accessToken: String|null = null;

export function getAccessToken() {
    return accessToken;
}

export function getAuthenticationURL() {
    return (
        `https://id.twitch.tv/oauth2/authorize?${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`
    );
}

export function loadTokens(callbackURL: String) {
    const urlParts = url.parse(callbackURL, true);
    console.log(urlParts);
    setItem('accessToken', urlParts.query.access_token);
    return urlParts.query;
}

export function validateToken(): boolean {
    const access
    return true;
}