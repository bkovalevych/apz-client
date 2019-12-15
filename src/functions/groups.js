import axios from "axios";

export const get = (filter = null) => {
    return axios.post('/groups', {object: filter}).then(resp => {
        return resp.data;
    }).catch(err => {
        return {errors: err};
    })
};