import axios from 'axios'

let baseURL = '' 

if(typeof window === "undefined") {
    baseURL = 'http://localhost:80'
}

const api = axios.create({
    baseURL
})

export default api