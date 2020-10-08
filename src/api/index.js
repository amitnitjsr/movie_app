import axios from "axios";
import { apiBaseUrl } from "../shared/helpers";

const axiosInstance = axios.create({
    baseURL: apiBaseUrl
})
export default axiosInstance;
export const callApi = (url, method, data) => {

    const dataObj = !data ? {} : { [['GET', 'DELETE'].indexOf(method.toUpperCase()) !== -1 ? 'params' : 'data']: data }
    return new Promise((resolve, reject) => {
        return axiosInstance({
            url,
            method: method.toUpperCase(),
            ...dataObj
        }).then(response => {
            console.log("callApi", response, response.data.data);
            if (response.status === 200) {
                resolve(response.data);
            }
            else {
                reject();
            }
        }).catch(error => {
            reject();
            console.log(error)
        })
    })
}
