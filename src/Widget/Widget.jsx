import "./Widget.scss";
import { FaUserAlt, FaMoneyBill, FaDonate } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserAPI from "../API/User";
import DonationAPI from "../API/DonationAPI";
import convertMoney from "../convertMoney";

const Widget = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [donations, setDonation] = useState([]);

  useEffect(() => {
    try {
      const getAllUsers = async () => {
        const res = await UserAPI.getAllUser();
        setUsers(res.data);
      };
      const getAllDonation = async () => {
        const res = await DonationAPI.getAllDonation();
        setDonation(res.data);
      };
      getAllDonation();
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // TOTAL USER
  const totalUser = users.length;

  // TOTAL DONATIONS
  const totalDonation = donations.length;

  // TOTAL MONEY
  const moneyArr = donations.map((item) => item.amount);
  const initValue = 0;
  const totalMoney = moneyArr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initValue
  );

  let data;
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        value: totalUser,
        isMoney: false,
        icon: (
          <FaUserAlt
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "money":
      data = {
        title: "DONATE MONEY",
        value: convertMoney(totalMoney),
        isMoney: true,
        icon: (
          <FaMoneyBill
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "donation":
      data = {
        title: "DONATION",
        value: totalDonation,
        isMoney: false,
        icon: (
          <FaDonate
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="widget">
          <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
              {data.isMoney && "VND"} {data.value}
            </span>
          </div>
          <div className="right">{data.icon}</div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
