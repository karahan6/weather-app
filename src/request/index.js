import axios from 'axios';

const request = axios.create({
    headers: {
        "Content-Type": "application/json",
    }
});
export function getRequest(url, params) {
    return request.get(url, {params: params});
}

export function postRequest(url, data, params) {
    return request.post(url, data, {params:params});
}
