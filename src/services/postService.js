import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/posts";

// export const getAll = () => request.getAll(baseUrl);

export const getOne = (postId) => request.get(`${baseUrl}/${postId}`);

export const getAll = async (query) => {
  if (query) {
    const match = encodeURIComponent(`title="${query}"`);
    console.log(match);
    return request.get(`${baseUrl}?where=${match}}`);
  } else {
    return fetch(baseUrl).then((res) => res.json());
  }
};


export const create = (postData) => request.post(baseUrl, postData);

export const edit = (postId, postData) => request.put(`${baseUrl}/${postId}`, postData);

export const remove = (postId) => request.del(`${baseUrl}/${postId}`);