import { APIClient } from "./axiosClient";

const DonationAPI = {
  getAllDonation: () => {
    const url = "/donation";
    return APIClient.get(url);
  },
  addDonation: (data) => {
    const url = "/donation/add";
    return APIClient.post(url, data);
  },
  deleteDonation: (id) => {
    const url = `/donation/delete/${id}`;
    return APIClient.delete(url);
  },
  getDonationDetail: (id) => {
    const url = `/donation/${id}`;
    return APIClient.get(url);
  },
  updateDonation: (id, body) => {
    const url = `/donation/update/${id}`;
    return APIClient.put(url, body);
  },
  getHistoryDonation: (id) => {
    const url = `/donation/history/${id}`;
    return APIClient.get(url);
  },
};

export default DonationAPI;
