import "./Home.scss";
import SidebarComponent from "../Sidebar/Sidebar";
import Widget from "../Widget/Widget";
import Header from "../Header/Header";
import Table from "../Table/Table";

import Footer from "../Footer/Footer";

const Home = () => {
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
          <p>Dashboard</p>
          <div className="widgets">
            <Widget type="user" />
            <Widget type="money" />
            <Widget type="donation" />
          </div>
          <p>Lastes Donation</p>
          <div className="table">
            <Table />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
