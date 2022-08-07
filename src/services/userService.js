import * as request from "./requester";

const baseUrl = 'http://localhost:3030/users';

export const editProfile = (firstName, lastName, userId) =>
    request.post(`${baseUrl}/edit/${userId}`, { firstName, lastName });

export const deleteProfile = (userId) => {
    request.del(`${baseUrl}/delete/${userId}`, userId);
}

export const getUser = () =>
request.get(`${baseUrl}/me`);