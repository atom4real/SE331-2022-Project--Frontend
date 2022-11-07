import axios from 'axios'

const apiClient = axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "http://54.145.134.162:8999",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token') 
    }
})
export default apiClient