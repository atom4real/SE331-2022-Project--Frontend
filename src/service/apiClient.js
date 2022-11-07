import axios from 'axios'

const apiClient = axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "http://44.212.159.104:8999",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token') 
    }
})
export default apiClient