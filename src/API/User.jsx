import { APIClient } from "./axiosClient";

const UserAPI = {
  getAllUser: () => {
    const url = "/user";
    return APIClient.get(url);
  },
  addUser: (data) => {
    const url = "/user/add";
    return APIClient.post(url, data);
  },
  deleteUser: (id) => {
    const url = `/user/delete/${id}`;
    return APIClient.delete(url);
  },
  getUserDetail: (id) => {
    const url = `/user/${id}`;
    return APIClient.get(url);
  },
  updateUser: (id, body) => {
    const url = `/user/update/${id}`;
    return APIClient.put(url, body);
  },
};

export default UserAPI;
