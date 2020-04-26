import axios from 'axios'

//

export function setAuthToken() {
  if (localStorage.rebookToken) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.rebookToken
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

//

export async function loadUser() {
  setAuthToken()

  // error -> response -> data -> msg
  axios
    .get('/auth')
    .then(res => console.log('from loadUser success', res))
    .catch(error => console.log('from loadUser failure', error, error.response))

  // TO-DO: notify user
}
