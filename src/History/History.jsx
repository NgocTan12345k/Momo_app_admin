import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DonationAPI from "../API/DonationAPI";
import dateFormat from "dateformat";
import convertMoney from "../convertMoney";

const History = () => {
  // const [historyDonation, setHistoryDonation] = useState([]);
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  // const { id } = useParams();
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  useEffect(() => {
    // const getHistoryDonation = async () => {
    //   await DonationAPI.getHistoryDonation(id)
    //     .then((res) => {
    //       setHistoryDonation(res.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };
    // getHistoryDonation();
    try {
      const getAllDonation = async () => {
        const res = await DonationAPI.getAllDonation();
        setDonations(res.data);
      };
      getAllDonation();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = [
    { field: "col1", headerName: "STT", width: 50 },
    // {
    //   field: "col2",
    //   headerName: "UserID",
    //   width: 200,
    // },
    {
      field: "col2",
      headerName: "User Name",
      width: 200,
    },
    {
      field: "col3",
      headerName: "Create date",

      width: 150,
    },
    {
      field: "col4",
      headerName: "Post Title",
      width: 350,
    },
    {
      field: "col5",
      headerName: "Amount",
      width: 150,
    },
    {
      field: "col6",
      headerName: "Payment Method",
      width: 150,
    },
  ];
  // Search By payment

  const rows = donations
    .filter((item) => {
      if (search === "") {
        return item.payment;
      } else {
        return item.payment.toLowerCase().includes(search.toLowerCase());
      }
    })
    .map((item, index) => {
      return {
        id: index + 1,
        col1: index + 1,
        // col2: item.user_id._id,
        col2: item.user_id.fullName,
        col3: dateFormat(item.createdAt, "dd/mm/yyyy"),
        col4: item.post_id.title,
        col5: `${convertMoney(item.amount)} VND`,
        col6: item.payment,
      };
    });
  return (
    <div className="home">
      <div className="header">
        <Header />
      </div>
      <div className="homeContainer">
        <div className="sidebar">
          <SidebarComponent />
        </div>
        <div className="content">
          <h1>History</h1>
          <div className="userDashboard">
            <div className="userDashboard_title">
              <div className="user_search">
                <form action="">
                  <label htmlFor="">Search Donation</label>
                  <input type="text" onChange={handleSearch} />
                </form>
              </div>
            </div>
            <div className="userDashboard_content">
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  className="datagrid"
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 8,
                      },
                    },
                  }}
                  pageSizeOptions={[8]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};
export default History;
