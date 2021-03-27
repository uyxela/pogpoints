const axios = require('axios');
const url = require('url');
import {twitch} from "../data/env.json";
import {getItem, setItem, deleteItem} from '../data/Store';

const {client_id, redirect_uri, response_type, scope} = twitch;

let accessToken: String|null = null;
let refreshToken: String|null = null;

function getAccessToken() {
    return accessToken;
}

function getAuthenticationURL() {
    return (
        `https://id.twitch.tv/oauth2/authorize?${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`
    );
}

async function refreshTokens() {
    const refreshToken = await getItem("refreshToken");

    if (refreshToken) {
        
    }
}

async function loadTokens(callbackURL: String) {
    const urlParts = url.parse(callbackURL, true);
    const query = urlParts.query;
}