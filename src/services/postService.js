import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/posts";

// export const getAll = () => request.getAll(baseUrl);
// export const getAll = () => {
//     return fetch(baseUrl)
//         .then(res => res.json());
// }

export const getAll = async (query) => {
    if (query) {
      return request.get(baseUrl, query)
    } else {
      return fetch(baseUrl).then((res) => res.json());
    }
  };

export const create = (postData) => request.post(baseUrl, postData);