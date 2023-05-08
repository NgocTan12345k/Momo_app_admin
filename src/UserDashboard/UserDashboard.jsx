import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import UserAPI from "../API/User";
import dateFormat from "dateformat";
import DonationAPI from "../API/DonationAPI";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [donatons, setDonations] = useState([]);
  // const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await Promise.all([
          UserAPI.getAllUser(),
          DonationAPI.getAllDonation(),
        ]);
        setUsers(res[0].data);
        setDonations(res[1].data);
      } catch (error) {
        throw Error("Promise failed");
      }
    };
    fetchAll();
  }, []);

  // List userId in donations
  const listUser_idDonations = donatons.map((item) => item.user_id._id);
  const uniqueListUser_idDonations = [...new Set(listUser_idDonations)];

  const deleteUser = async (value) => {
    try {
      const id = value.id;
      const role = value.col6;
      if (role === "admin") {
        alert("You cannot delete admin!");
      } else {
        const result = window.confirm("Do you want to delete this user?");
        if (result && uniqueListUser_idDonations.includes(id) === false) {
          await UserAPI.deleteUser(id);
          alert("Delete user successful!");
          setUsers(users.filter((item) => item._id !== id));
        } else if (result && uniqueListUser_idDonations.includes(id) === true) {
          await UserAPI.updateUser(id, {
            status: "deleted",
          })
            .then((res) => {
              if (res.data.message === "update user successful") {
                window.location.reload(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          alert(
            "You cannot delete this user because this user has made at least one donation!"
          );
        } else {
          alert("Delete user Unsuccessful");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  const columns = [
    { field: "col1", headerName: "STT", width: 50 },
    {
      field: "col2",
      headerName: "Full Name",
      width: 200,
    },
    {
      field: "col3",
      headerName: "Create date",

      width: 150,
    },
    {
      field: "col4",
      headerName: "Email",

      width: 150,
    },
    {
      field: "col5",
      headerName: "Password",
      width: 250,
    },
    {
      field: "col6",
      headerName: "Role",

      width: 80,
    },
    {
      field: "col7",
      headerName: "Status",
      width: 110,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (user) => {
        return (
          <>
            <div className="btn btn-success" style={{ margin: "5px" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
                to={`/users/update/${user.row.id}`}
              >
                Update
              </Link>
            </div>
            <div className="btn btn-danger">
              <Link
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
                onClick={() => deleteUser(user.row)}
              >
                Delete
              </Link>
            </div>
          </>
        );
      },
    },
  ];

  //  Filter By User Name and Email
  const rows = users
    .filter((item) => {
      if (search === "") {
        return item.fullName || item.email;
      } else {
        return (
          item.fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
        );
      }
    })
    .map((item, index) => {
      return {
        id: item._id,
        col1: index + 1,
        col2: item.fullName,
        col3: dateFormat(item.createdAt, "dd/mm/yyyy"),
        col4: item.email,
        col5: item.password,
        col6: item.role,
        col7: item.status,
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
          <p>User Dashboard</p>
          <div className="userDashboard">
            <div className="userDashboard_title">
              <div className="user_search">
                <form action="">
                  <label htmlFor="">Search User</label>
                  <input type="text" onChange={handleSearch} />
                </form>
              </div>
              <div className="user_new">
                <Link to="/users/newuser">Add User</Link>
              </div>
            </div>
            <div className="userDashboard_content">
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  className="datagrid"
                  rows={rows}
                  columns={columns.concat(actionColumn)}
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

export default UserDashboard;
