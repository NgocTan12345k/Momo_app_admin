import { APIClient } from "./axiosClient";

const PostAPI = {
  getAllPost: () => {
    const url = "/post/";
    return APIClient.get(url);
  },
  addPost: (data) => {
    const url = "/post/add";
    return APIClient.post(url, data);
  },
  deletePost: (id) => {
    const url = `/post/delete/${id}`;
    return APIClient.delete(url);
  },
  getPostDetail: (id) => {
    const url = `/post/${id}`;
    return APIClient.get(url);
  },
  updatePost: (id, body) => {
    const url = `/post/update/${id}`;
    return APIClient.put(url, body);
  },
};

export default PostAPI;
