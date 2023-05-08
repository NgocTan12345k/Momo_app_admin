import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
// import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DonationAPI from "../API/DonationAPI";
import dateFormat from "dateformat";
import convertMoney from "../convertMoney";

const DonationDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
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

  // const deleteDonation = async (id) => {
  //   try {
  //     const result = window.confirm("Do you want to delete this donation?");
  //     if (result) {
  //       await DonationAPI.deleteDonation(id);
  //       alert("Delete donation successful!");
  //       setDonations(donations.filter((item) => item._id !== id));
  //     } else {
  //       alert("Delete donation Unsuccessful!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  const columns = [
    { field: "col1", headerName: "ID", width: 50 },
    {
      field: "col2",
      headerName: "Full Name",
      width: 150,
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
      width: 100,
    },
  ];

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (donation) => {
  //       return (
  //         <>
  //           {/* <div className="btn btn-success" style={{ margin: "5px" }}>
  //             <Link
  //               style={{
  //                 textDecoration: "none",
  //                 color: "#000",
  //               }}
  //               to={`/donations/update/${donation.row.col1}`}
  //             >
  //               Update
  //             </Link>
  //           </div> */}
  //           {/* <div className="btn btn-danger">
  //             <Link
  //               style={{
  //                 textDecoration: "none",
  //                 color: "#000",
  //               }}
  //               onClick={(e) => deleteDonation(donation.row.col1)}
  //             >
  //               Delete
  //             </Link>
  //           </div> */}
  //         </>
  //       );
  //     },
  //   },
  // ];

  // Search By user Name and payment

  const rows = donations
    .filter((item) => {
      if (search === "") {
        // return item.user_id.fullName || item.amount;
        return item.user_id.fullName || item.payment;
      } else {
        return (
          // item.user_id.fullName.toLowerCase().includes(search.toLowerCase()) ||
          // item.amount.toString().toLowerCase().includes(search.toLowerCase())
          item.user_id.fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.payment.toLowerCase().includes(search.toLowerCase())
        );
      }
    })
    .map((item, index) => {
      return {
        id: item._id,
        col1: index + 1,
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
          <p>Donation Dashboard</p>
          <div className="userDashboard">
            <div className="userDashboard_title">
              <div className="user_search">
                <form action="">
                  <label htmlFor="">Search Donation</label>
                  <input type="text" onChange={handleSearch} />
                </form>
              </div>
              {/* <div className="user_new">
                <Link to="/donations/newdonation">Add Donation</Link>
              </div> */}
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

export default DonationDashboard;
