import { useState } from "react";
import AuthAPI from "../API/AuthAPI";
import { Navigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import "./Auth.scss";
import { useForm, Controller } from "react-hook-form";
import { Label } from "reactstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isErrorConfirmEmail, setIsErrorConfirmEmail] = useState(false);
  const [isNotAdmin, setIsNotAdmin] = useState(false);

  const handleSubmitForm = (data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    const Login = async () => {
      await AuthAPI.Login(formData)
        .then((res) => {
          if (
            res.data.message === "login successful" &&
            res.data.user.role === "admin"
          ) {
            localStorage.setItem("currentUser", res.data.user.fullName);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("userID", res.data.user.userID);
            setRedirect(true);
          } else {
            setIsNotAdmin(true);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message === "wrong email") {
            setIsErrorEmail(true);
            setIsErrorPassword(false);
          } else if (error.response.data.message === "wrong password") {
            setIsErrorPassword(true);
            setIsErrorEmail(false);
          } else if (
            error.response.data.message ===
            "Please confirm your email to login!"
          ) {
            setIsErrorEmail(false);
            setIsErrorConfirmEmail(true);
          }
        });
    };
    Login();
  };
  return (
    <MDBContainer className="auth" fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <Label>Email</Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email!",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      size="lg"
                      type="email"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.email && (
                  <p style={{ color: "red", marginLeft: "0.5rem" }}>
                    {errors?.email.message}
                  </p>
                )}
                {isErrorEmail && <p style={{ color: "red" }}>Wrong Email</p>}
                {isErrorConfirmEmail && (
                  <p style={{ color: "red" }}>
                    Please confirm your email to login!
                  </p>
                )}
                {isNotAdmin && (
                  <p style={{ color: "red" }}>You are not authorized!</p>
                )}
                <Label>Password</Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      size="lg"
                      type="password"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.password && (
                  <p style={{ color: "red", marginLeft: "0.5rem" }}>
                    {errors?.password.message}
                  </p>
                )}
                {isErrorPassword && (
                  <p style={{ color: "red" }}>Wrong Password</p>
                )}

                {redirect && <Navigate to="/" />}
                <MDBBtn
                  className="mt-4 w-100"
                  style={{ width: "80px", height: "56px" }}
                  size="lg"
                >
                  Login
                </MDBBtn>
                <Link
                  style={{
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                  to="/forgotPassword"
                >
                  <p>Forgot password?</p>
                </Link>
                <hr className="my-4" />
                <MDBBtn
                  className="mb-2 w-100"
                  size="lg"
                  style={{
                    backgroundColor: "#dd4b39",
                    border: "none",
                    width: "80px",
                    height: "56px",
                  }}
                >
                  <MDBIcon fab icon="google" className="mx-2" />
                  Sign in with google
                </MDBBtn>
                <MDBBtn
                  className="mb-2 w-100"
                  size="lg"
                  style={{
                    backgroundColor: "#3b5998",
                    border: "none",
                    width: "80px",
                    height: "56px",
                  }}
                >
                  <MDBIcon fab icon="facebook-f" className="mx-2" />
                  Sign in with facebook
                </MDBBtn>
                <p style={{ textAlign: "center" }}>
                  Not a member? &nbsp;
                  <Link
                    style={{
                      textDecoration: "none",
                      width: "80px",
                      height: "40px",
                    }}
                    to="/register"
                  >
                    <span>Ceate a new account</span>
                  </Link>
                </p>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
