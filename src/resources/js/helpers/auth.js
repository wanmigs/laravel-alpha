import Cookie from 'js-cookie'

export const setToken = (token) => Cookie.set('oToken', token)
export const isLoggedIn = () => Cookie.get('oToken')

export const logout = async (callback) => {
  setToken('')
  await axios.post('/api/logout')
  window.location = '/'

  callback()
}
