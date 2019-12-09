import axios from "axios";

export const getMedia = () => {
    return axios.
    post('/move', {}).
    then(res => {
        return res.data.data;
    })
};