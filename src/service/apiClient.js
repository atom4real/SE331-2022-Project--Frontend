import axios from 'axios'

const apiClient = axios.create({
    baseURL: "http://18.234.126.238:8999",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token') 
    }
})
export default apiClient