const axios = require('axios').default;

const baseUrl = 'https://murmuring-tor-81614.herokuapp.com/';
const baseApiUrl = new URL('api', baseUrl).toString();
axios.defaults.baseURL = baseApiUrl;

export async function getGoods(dealers) {
  try {
    const { data } = await axios.get('goods', {
      params: dealers && new URLSearchParams({ dealers }),
    });

    return data;
  } catch (e) {
    // TODO Change it when done. It's for local dev without network
    return [
      { name: 'Python', price: 5.35, image: '/logo/python.png' },
      { name: 'Go', price: 7.55, image: '/logo/go.png' },
      { name: 'Node.js', price: 9.99, image: '/logo/node.png' },
      { name: 'С#', price: 9.99, image: '/logo/ch.png' },
      { name: 'VS Code', price: 10.25, image: '/logo/code.png' },
      { name: 'Sublime', price: 17.4, image: '/logo/sublime.png' },
      { name: 'Vim', price: 99.99, image: '/logo/vim.png' },
      { name: 'WebStorm', price: 33.43, image: '/logo/webstorm.png' },
      { name: 'Vue', price: 50.35, image: '/logo/vue.png' },
      { name: 'React', price: 66.6, image: '/logo/react.png' },
      { name: 'Angular', price: 3.75, image: '/logo/angular.png' },
      { name: 'Sass', price: 11.11, image: '/logo/sass.png' },
    ];
  }
}

export function getImageUrl(imgPath = '') {
  return new URL(imgPath, baseUrl).toString();
}
