import axios from 'axios'

let options = {
  baseURL: `http://localhost:3001`,
  timeout: 1000,
  withCredentials: true
}
if (sessionStorage.getItem('user')){
  let token = JSON.parse(sessionStorage.getItem('user')).token
  console.log(token)
  options.headers= {'Authorization': 'Bearer '+ token}
}

export default() => {
  return axios.create(options)
}

