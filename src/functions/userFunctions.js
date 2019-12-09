import axios from 'axios';

export const login = (email, password) => {
   return axios.
   post('/users/login', {email: email, password: password}).
   then(res => {
        if(res.data.data){
            localStorage.setItem('userToken', res.data.data);
        }
        return res.data
   }).catch(err => {
            console.log(err);
            return {errors:err};
   })
};

export const logout = (id) => {
    return axios.post('users/logout', {'idSession': id}).
    then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
    })
};

export const register = (email, nickname, password) => {
    return axios.
    post('/users/register', {email: email, password: password, nickname: nickname}).
    then(res => {
        return res.data;
    }).catch(err => {
        return {errors: err};
    })
};

export const getGroups = () => {
    return axios.
    post('/move', {}).
    then(res => {
        return res.data;
    })
        .catch(err => {
            console.log(err);
        })
};