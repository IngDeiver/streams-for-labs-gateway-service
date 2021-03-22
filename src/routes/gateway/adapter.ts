const axios = require('axios');

const adapter = (baseURL: string) => {
  return axios.create({
    baseURL: baseURL,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
}

export default adapter