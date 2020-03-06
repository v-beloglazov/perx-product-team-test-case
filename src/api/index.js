const axios = require('axios').default;

const baseUrl = 'https://murmuring-tor-81614.herokuapp.com/';
const baseApiUrl = `${baseUrl}api`;
axios.defaults.baseURL = baseApiUrl;

export async function getGoods(dealers) {
  const { data } = await axios.get('goods', {
    params: dealers && new URLSearchParams({ dealers }),
  });

  return data;
}

export function getImageUrl(imgPath = '') {
  return `${baseUrl}${imgPath}`;
}
