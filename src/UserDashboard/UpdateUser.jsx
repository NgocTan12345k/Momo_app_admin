import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import UserAPI from "../API/User";
import { useForm, Controller } from "react-hook-form";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { Label } from "reactstrap";
import { Navigate, useParams } from "react-router-dom";
import Select from "react-select";

const UpdateUser = () => {
  const [userDetail, setUserDetail] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });

  useEffect(() => {
    const getUserDetail = async () => {
      await UserAPI.getUserDetail(id)
        .then((res) => {
          setUserDetail(res.data);
          setValue("fullName", res.data.fullName);
          setValue("email", res.data.email);
          setValue("password", res.data.password);
          setValue("status", {
            value: res.data.status,
            label: res.data.status,
          });
          setValue("role", {
            value: res.data.role,
            label: res.data.role,
          });

          if (res.data.role === "admin") {
            setDisabled(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserDetail();
  }, [id, setValue]);

  const handleSubmitForm = async (data) => {
    const formData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      status: data.status.value,
      role: data.role.value,
    };
    let result = window.confirm("Do you want to update this user?");
    if (result) {
      await UserAPI.updateUser(id, formData)
        .then((res) => {
          if (res && res.data.message === "update user successful") {
            alert("Update user successful!");
            setRedirect(true);
          } else {
            alert("Update user Unsuccessful!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Update user Unsuccessful!");
      setRedirect(true);
    }
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
              <h1>Update User</h1>
              <Form onSubmit={handleSubmit(handleSubmitForm)}>
                {/* <Label>Full Name</Label>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  required
                  type="text"
                  name="fullName"
                  value={userDetail.fullName}
                  {...register("fullName")}
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
                  disabled={true}
                  value={userDetail.email}
                  {...register("email", {
                    pattern: {
                      required: "Email is required!",
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

                <Label>Password</Label>

                <MDBInput
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  required
                  type="password"
                  name="password"
                  value={userDetail.password}
                  {...register("password")}
                  disabled={true}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors?.password.message}</p>
                )}

                <Label>Status</Label>
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
                  name="status"
                  value={userDetail.status}
                  {...register("status", {
                    onChange: (e) => {
                      handleChangeInput(e);
                    },
                  })}
                >
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
                  value={userDetail.role}
                  {...register("role", {
                    onChange: (e) => {
                      handleChangeInput(e);
                    },
                  })}
                  disabled={disabled}
                >
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
                    <MDBInput
                      onChange={onChange}
                      value={value ?? userDetail.fullName}
                    />
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
                    <MDBInput
                      disabled={true}
                      type="email"
                      onChange={onChange}
                      value={value ?? userDetail.email}
                    />
                  )}
                />
                {/* {errors.email && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {errors?.email.message}
                  </p>
                )} */}

                <Label>Password</Label>
                <Controller
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  control={control}
                  // rules={{
                  //   required: "Password is required!",
                  //   pattern: {
                  //     value:
                  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  //     message:
                  //       "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                  //   },
                  // }}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      disabled={true}
                      type="password"
                      onChange={onChange}
                      value={value ?? userDetail.password}
                    />
                  )}
                />
                {/* {errors.password && (
                  <p style={{ color: "red" }}>{errors?.password.message}</p>
                )} */}
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value}
                      onChange={(val) => {
                        onChange(val);
                      }}
                      // defaultValue={{
                      //   value: userDetail.status,
                      //   label: userDetail.status,
                      // }}
                      options={[
                        { value: "active", label: "active" },
                        { value: "inactive", label: "inactive" },
                        { value: "deleted", label: "deleted" },
                      ]}
                    />
                  )}
                />
                <Label>Role</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isDisabled={disabled}
                      {...field}
                      options={[
                        {
                          value: "admin",
                          label: "admin",
                        },
                        {
                          value: "client",
                          label: "client",
                        },
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

export default UpdateUser;
