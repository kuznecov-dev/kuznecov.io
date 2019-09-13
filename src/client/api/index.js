import axios from 'axios'
import config from 'Root/config'

let baseURL = config.baseUrl

if(typeof window === "undefined") {
    baseURL = config.baseUrlServer
}

const api = axios.create({
    baseURL
})

export default api