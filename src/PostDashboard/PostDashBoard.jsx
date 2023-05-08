import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import PostAPI from "../API/PostAPI";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import convertMoney from "../convertMoney";
import DonationAPI from "../API/DonationAPI";

const PostDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await Promise.all([
          PostAPI.getAllPost(),
          DonationAPI.getAllDonation(),
        ]);
        setPosts(res[0].data);
        setDonations(res[1].data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, []);

  const listPost_idDonations = donations.map((item) => item.post_id._id);
  const uniqueListPost_idDonations = [...new Set(listPost_idDonations)];

  const deletePost = async (id) => {
    try {
      const result = window.confirm("Do you want to delete this post?");
      console.log("test-->", uniqueListPost_idDonations.includes(id));
      if (result && uniqueListPost_idDonations.includes(id) === false) {
        await PostAPI.deletePost(id);
        alert("Delete post successfully!");
        setPosts(posts.filter((item) => item._id !== id));
      } else if (result && uniqueListPost_idDonations.includes(id) === true) {
        await PostAPI.updatePost(id, {
          status: "deleted",
        })
          .then((res) => {
            if (res.data.message === "update post successfully") {
              window.location.reload(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        alert(
          "You cannot delete this post because this post has at least one donation!"
        );
      } else {
        alert("Delete post unsuccessfully!");
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
      headerName: "Creator",
      width: 200,
    },
    {
      field: "col3",
      headerName: "Title",
      width: 180,
    },
    {
      field: "col4",
      headerName: "Description",
      width: 180,
    },
    {
      field: "col5",
      headerName: "DateStart",
      width: 100,
    },
    {
      field: "col6",
      headerName: "DateEnd",
      width: 100,
    },
    {
      field: "col7",
      headerName: "Target",
      width: 180,
    },
    {
      field: "col8",
      headerName: "Status",
      width: 100,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (post) => {
        return (
          <>
            <div className="btn btn-success" style={{ margin: "5px" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
                to={`/posts/update/${post.row.id}`}
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
                onClick={(e) => deletePost(post.row.id)}
              >
                Delete
              </Link>
            </div>
          </>
        );
      },
    },
  ];
  // Search by title and status
  const rows = posts
    .filter((item) => {
      if (search === "") {
        return item.title || item.status;
      } else {
        return (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.status.toLowerCase().includes(search.toLowerCase())
        );
      }
    })
    .map((item, index) => {
      return {
        id: item._id,
        col1: index + 1,
        col2: item.user_id.fullName,
        col3: item.title,
        col4: item.description,
        col5: dateFormat(item.dateStart, "dd/mm/yyyy"),
        col6: dateFormat(item.dateEnd, "dd/mm/yyyy"),
        col7: `${convertMoney(item.target)} VND`,
        col8: item.status,
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
          <p>Post Dashboard</p>
          <div className="userDashboard">
            <div className="userDashboard_title">
              <div className="user_search">
                <form action="">
                  <label htmlFor="">Search Post</label>
                  <input type="text" onChange={handleSearch} />
                </form>
              </div>
              <div className="user_new">
                <Link to="/posts/newpost">Add Post</Link>
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

export default PostDashboard;
