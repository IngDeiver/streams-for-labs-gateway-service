import http from 'http'
const TOKEN = process.env.VAULT_TOKEN


export const queryVault = (uri: string) => {

  return new Promise((resolve, reject) => {
  
    const options = {
      port: 8200,
      host: process.env.VAULT_HOST,
      path: `/v1/${uri}`,
      headers:{
        'X-Vault-Token': TOKEN
      }
    }
  
    http.get(options, response => {
      let body = '';
    
      response.on('data',chunk => {
        body += chunk
      })
    
      response.on('end', () => {
        const {data}  = JSON.parse(body)
        resolve(data)
      })
    
    
    }).on('error', (e) => {
      reject(e)
    });
  })
}

queryVault("/v1/kv/rsa")
.then(data  => console.log(data))
.catch(err  => console.log(err.message))