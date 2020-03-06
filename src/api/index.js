const axios = require('axios').default;

const baseApiUrl = 'https://murmuring-tor-81614.herokuapp.com/api/';
axios.defaults.baseURL = baseApiUrl;

export async function getGoods(dealers) {
  const { data } = axios.get('goods', {
    params: new URLSearchParams({ dealers }),
  });
  return data;
}

export function getImageUrl(imgPath = '') {
  return new URL(imgPath, baseApiUrl);
}
