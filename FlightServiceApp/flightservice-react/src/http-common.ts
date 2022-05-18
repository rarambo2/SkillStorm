import axios from "axios";

const http = axios.create({
    baseURL: "https://localhost:7072/api",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default http;