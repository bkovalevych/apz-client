import axios from 'axios';

export const findFollowers = (id) => {
    return axios.post('/followers/getFollowers', {id: id}).then(result => {
        return result.data;
    }).catch(err => {
        return {errors: err};
    })
};

export  const findSubscribes = (id) => {
    return axios.post('/followers/getSubscribes', {id: id}).then(result => {
        return result.data;
    }).catch(err => {
        return {errors: err};
    })
};

export  const unsubscribe = (idSession, arr) => {
  return axios.post('followers/unsubscribe', {idSession: idSession, object: arr}).then(result => {
      return result.data;
  }).catch(err => {
      return {errors: err};
  })
};

export  const subscribe = (idSession, idUser, idFollower) => {
  return axios.post('/followers/follow', {object: {user: idUser, follower: idFollower}, idSession: idSession}).then(resp => {
      return resp.data;
  }).catch((err) => {
      return {errors: err};
  })
};