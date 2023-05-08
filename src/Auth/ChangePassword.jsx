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
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import "./Auth.scss";
import { useForm, Controller } from "react-hook-form";
import { Label } from "reactstrap";

const ChangePassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const userID = localStorage.getItem("userID");

  const handleSubmitForm = async (data) => {
    const formData = {
      userID: userID,
      password: data.password,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };
    await AuthAPI.ChangePassword(formData)
      .then((res) => {
        console.log("res-->", res);
        if (res.data.message === "change password successful") {
          alert("Change password successful!");
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "wrong password") {
          setIsErrorPassword(true);
        } else if (
          error.response.data.message ===
          "Confirm New Password does not match New Password"
        ) {
          setIsErrorPassword(false);
          setIsErrorConfirmPassword(true);
        }
      });
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
              <h2 className="fw-bold mb-2 text-center">Change Password</h2>
              <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <Label>Current Password</Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Current password is required!",
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
                <Label>New Password</Label>
                <Controller
                  name="newPassword"
                  control={control}
                  rules={{
                    required: "New Password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                    },
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
                {errors.newPassword && (
                  <p style={{ color: "red", marginLeft: "0.5rem" }}>
                    {errors?.newPassword.message}
                  </p>
                )}

                <Label>Confirm New Password</Label>
                <Controller
                  name="confirmNewPassword"
                  control={control}
                  rules={{
                    required: "Confirm New Password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                    },
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
                {errors.confirmNewPassword && (
                  <p style={{ color: "red", marginLeft: "0.5rem" }}>
                    {errors?.confirmNewPassword.message}
                  </p>
                )}
                {isErrorConfirmPassword && (
                  <p style={{ color: "red" }}>
                    Confirm New Password does not match New Password!
                  </p>
                )}
                {redirect && <Navigate to="/" />}
                <MDBBtn
                  className="mt-4 w-100"
                  style={{ width: "80px", height: "40px" }}
                  size="lg"
                >
                  Change Password
                </MDBBtn>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChangePassword;
