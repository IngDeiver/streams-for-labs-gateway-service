const axios = require('axios');

const adapter = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
    headers: {'Content-Type': 'application/json'}
  });
}

export default adapter