// import "./Navbar.scss";
// import { BsMoon, BsClockHistory } from "react-icons/bs";
// import { MdLogout } from "react-icons/md";
// import logo from "../images/logo_admin.jpeg";
// import { UncontrolledCollapse, Card, CardBody, Button } from "reactstrap";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="nav">
//       <div className="nav-item">
//         <BsMoon className="icon" />
//       </div>
//       <div className="nav-item">
//         <p className="title">Hello anhtanhl</p>
//       </div>

//       <div className="toggle">
//         <Button
//           color="white"
//           id="toggler"
//           style={{
//             padding: 0,
//             margin: 0,
//           }}
//         >
//           <img src={logo} alt="logo" />
//         </Button>
//         <UncontrolledCollapse toggler="#toggler">
//           <Card
//             style={{
//               position: "absolute",
//               right: "50px",
//               top: "70px",
//             }}
//           >
//             <CardBody>
//               {" "}
//               <BsClockHistory className="icon" />
//               <Link>
//                 <span>History</span>
//               </Link>
//             </CardBody>
//             <CardBody>
//               <MdLogout className="icon" />
//               <Link>
//                 <span>Log out</span>{" "}
//               </Link>
//             </CardBody>
//           </Card>
//         </UncontrolledCollapse>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
