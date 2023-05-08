import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import UserDashboard from "./UserDashboard/UserDashboard";
import NewUser from "./UserDashboard/NewUser";
import DonationDashboard from "./DonationDashboard/DonationDashboard";

import PostDashboard from "./PostDashboard/PostDashBoard";
import NewPost from "./PostDashboard/NewPost";
import Register from "./Auth/Register";
import UpdateUser from "./UserDashboard/UpdateUser";

import UpdatePost from "./PostDashboard/UpdatePost";
import "./style/dark.scss";
import History from "./History/History";
import { useContext } from "react";
import { DarkModeContext } from "./Context/darkModeContext";
import ForgotPassword from "./Auth/ForgotPassword";
import ChangePassword from "./Auth/ChangePassword";

function App() {
  const ProtectRoute = ({ children }) => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route
              path="history/:id"
              element={
                <ProtectRoute>
                  <History />
                </ProtectRoute>
              }
            />
            <Route
              index
              element={
                <ProtectRoute>
                  <Home />
                </ProtectRoute>
              }
            />
            <Route path="/users/">
              <Route
                index
                element={
                  <ProtectRoute>
                    <UserDashboard />
                  </ProtectRoute>
                }
              />
              <Route
                path="newuser"
                element={
                  <ProtectRoute>
                    <NewUser />
                  </ProtectRoute>
                }
              />
              <Route
                path="update/:id"
                element={
                  <ProtectRoute>
                    <UpdateUser />
                  </ProtectRoute>
                }
              />
              <Route
                path="changePassword"
                element={
                  <ProtectRoute>
                    <ChangePassword />
                  </ProtectRoute>
                }
              />
            </Route>
            <Route path="/donations/">
              <Route
                index
                element={
                  <ProtectRoute>
                    <DonationDashboard />
                  </ProtectRoute>
                }
              />
            </Route>
            <Route path="/posts/">
              <Route
                index
                element={
                  <ProtectRoute>
                    <PostDashboard />
                  </ProtectRoute>
                }
              />
              <Route
                path="newpost"
                element={
                  <ProtectRoute>
                    <NewPost />
                  </ProtectRoute>
                }
              />
              <Route
                path="update/:id"
                element={
                  <ProtectRoute>
                    <UpdatePost />
                  </ProtectRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
