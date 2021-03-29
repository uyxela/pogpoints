const axios = require('axios');
const url = require('url');
import env from '../data/env.json';
import { getItem, setItem, deleteItem } from '../data/Store';

const { client_id, redirect_uri, response_type, scope } = env.twitch;
const apiUrl = env.url;

let accessToken: String | null = getItem('accessToken');
let user: any = null;

export function getAccessToken() {
  return accessToken;
}

export async function checkActivePogprize() {
  return await axios.get(`${apiUrl}/activepogprize/${await getUserID()}`);
}
export async function getPrizes() {
  return await axios.get(`${apiUrl}/prizes`);
}

export async function getPogPrizes() {
  return await axios.get(`${apiUrl}/pogprizes/${await getUserID()}`);
}

export async function getUser() {
  if (user !== null) {
    return user;
  }

  let response;

  try {
    response = await axios.get(`https://api.twitch.tv/helix/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': client_id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }

  user = response.data.data[0];
  // console.log(user);

  return response.data.data[0];
}

export async function getUserID() {
  if (user) {
    return user.id;
  }

  const userData = await getUser();
  return userData.id;
}

export function getAuthenticationURL() {
  return `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
}

export function handleCallback(callbackURL: String) {
  const urlParts = url.parse(callbackURL, true);
  const result = urlParts.hash.substr(1).split('&')[0].split('=')[1];
  accessToken = result;

  // deleteItem('accessToken')
  setItem('accessToken', result);
  // return urlParts.query;
}

export async function checkUser() {
  const userData = await getUser();
  console.log('here', userData.id);
  const response = await axios.get(`${apiUrl}/user/${userData.id}`);
  //console.log(response);
  if (response.data.twitchid === -1) {
    //console.log("new user");
    const res = await axios.post(`${apiUrl}/newUser/${userData.id}`);
    console.log(res.status);
  }
}

export const validateToken = async () => {
  let response;

  try {
    response = await axios.get(`https://id.twitch.tv/oauth2/validate`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

export const getEntries = async () => {
  let res = await checkActivePogprize();

  if (res.status === 200 && res.data.length == 0) {
    return [];
  } else {
    return res.data[0].entries;
  }
};

export const drawPogprize = async () => {
    await axios.post(`${apiUrl}/drawpogprize/${await getUserID()}`);
}

export const logOut = () => {
  deleteItem('accessToken');
  accessToken = null;
  user = null;
};
