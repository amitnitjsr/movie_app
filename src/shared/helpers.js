export const apiBaseUrl = `http://localhost:3002`;
export const updateObject = (oldObj, newObj) => {
    console.log({ ...oldObj, ...newObj })
    return { ...oldObj, ...newObj };
}

export const getMethod = (type) => {
    let obj = {
        ADD: "post",
        UPDATE: "put",
        DELETE: "delete",
        GET: "get",
        GET_ALL: "get"
    }
    return obj[type];
}

export const getAuthToken = localStorage.getItem("access-token");
export const getAuthUserId = localStorage.getItem("login-userId");
export const getImageUrl = imgUrl => apiBaseUrl + imgUrl;