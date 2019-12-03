import Axios from 'axios'

const baseDomain = process.env.VUE_APP_API
const baseURL = `${baseDomain}/api`

export default Axios.create({
    baseURL,
    //headers: { "Authorization": "Bearer ifToken"}
    headers:{'Content-Type': 'application/json'}
})