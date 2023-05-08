import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import UserAPI from "../API/User";
import { useForm, Controller } from "react-hook-form";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { Label } from "reactstrap";
import { Navigate } from "react-router-dom";
import Select from "react-select";

const NewUser = () => {
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ mode: "all" });

  const handleSubmitForm = async (data) => {
    console.log("data-->", data);
    const formData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role.value,
      // status: data.status.value,
    };
    console.log("formData-->", formData);
    await UserAPI.addUser(formData)
      .then((res) => {
        // console.log("res-->", res);
        if (res.data.message === "add user successful") {
          alert("add user successful!");
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("erros-->", error.response.data.message);
        if (error.response.data.message === "email already exists") {
          setIsErrorEmail(true);
        }
      });
  };
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
          <div className="userDashboard">
            <div className="newUserForm">
              <h1>New User</h1>
              <Form onSubmit={handleSubmit(handleSubmitForm)}>
                {/* <Label>Full Name</Label>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  required
                  type="text"
                  name="fullName"
                  value={formValue.fullName}
                  {...register("fullName", {
                    required: "Full Name is required!",
                    onChange: (e) => {
                      handleChangeInput(e);
                    },
                  })}
                />
                {errors.fullName && (
                  <p style={{ color: "red" }}>{errors?.fullName.message}</p>
                )}

                <Label>Email</Label>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  required
                  type="email"
                  name="email"
                  value={formValue.email}
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email!",
                    },
                    onChange: (e) => {
                      handleChangeInput(e);
                    },
                  })}
                />
                {errors.email && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {errors?.email.message}
                  </p>
                )}
                {isErrorEmail && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Email already exist!
                  </p>
                )}

                <Label>Password</Label>

                <MDBInput
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  required
                  type="password"
                  name="password"
                  value={formValue.password}
                  {...register("password", {
                    required: "Password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                    },
                    onChange: (e) => {
                      handleChangeInput(e);
                    },
                  })}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors?.password.message}</p>
                )}

                <Label>Status</Label>
                <select
                  style={{
                    padding: "0.5rem 1rem",
                    height: "48px",
                    fontSize: "1rem",
                    borderRadius: "0.3rem",
                    width: "100%",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    color: "#212529",
                    border: "1px solid #ced4da",
                    marginBottom: "0.5rem",
                  }}
                  name="status"
                  value={formValue.status}
                  {...register("status", {
                    onChange: (e) => {
                      handleChangeInput(e);
                    },
                  })}
                >
                  <option defaultValue>Please choose a status</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                  <option value="deleted">deleted</option>
                </select>

                <Label>Role</Label>
                <select
                  style={{
                    height: "48px",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    borderRadius: "0.3rem",
                    width: "100%",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    color: "#212529",
                    border: "1px solid #ced4da",
                    marginBottom: "0.5rem",
                  }}
                  name="role"
                  value={formValue.role}
                  {...register("role", {
                    onChange: (e) => {
                      handleChangeInput(e);
                    },
                  })}
                >
                  <option defaultValue>Please choose a role</option>
                  <option value="client">client</option>
                  <option value="admin">admin</option>
                </select> */}
                <Label>Full Name</Label>
                <Controller
                  name="fullName"
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  control={control}
                  rules={{
                    required: "Full Name is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput onChange={onChange} value={value} />
                  )}
                />
                {errors.fullName && (
                  <p style={{ color: "red" }}>{errors?.fullName.message}</p>
                )}
                <Label>Email</Label>
                <Controller
                  wrapperClass="mb-2 w-100"
                  size="lg"
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
                    <MDBInput type="email" onChange={onChange} value={value} />
                  )}
                />
                {errors.email && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {errors?.email.message}
                  </p>
                )}
                {isErrorEmail && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Email already exist!
                  </p>
                )}
                <Label>Password</Label>
                <Controller
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  control={control}
                  rules={{
                    required: "Password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                    },
                  }}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      type="password"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors?.password.message}</p>
                )}
                {/* <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "active", label: "active" },
                        { value: "inactive", label: "inactive" },
                        { value: "deleted", label: "deleted" },
                      ]}
                    />
                  )}
                /> */}
                <Label>Role</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "admin", label: "admin" },
                        { value: "client", label: "client" },
                      ]}
                    />
                  )}
                />
                {redirect && <Navigate to="/users" />}
                <MDBBtn
                  className="mt-4"
                  style={{ width: "80px", height: "40px" }}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </MDBBtn>
              </Form>
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

export default NewUser;
