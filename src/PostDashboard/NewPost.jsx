import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import PostAPI from "../API/PostAPI";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { Label } from "reactstrap";
import { Navigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewPost = () => {
  const [redirect, setRedirect] = useState(false);
  const [isErrorDateTime, setIsErrorDateTime] = useState(false);
  const [content, setContent] = useState("");
  const user_id = localStorage.getItem("userID");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({ mode: "all" });

  const formData = new FormData();
  const handleOnChangeFile = () => {
    // for (let i = 0; i < fileList.length; i++) {
    //   formData.append("photos", fileList[i]);
    // }
    // console.log("file-->", files[0]);
    // formData.append("photo", files[0]);
  };

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            formData.append("content", file);
          });
        });
      },
    };
  };
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const handleSubmitForm = (data) => {
    console.log("allData", data);
    const start = new Date(data.dateStart).getTime();
    const end = new Date(data.dateEnd).getTime();

    if (start > end) {
      setIsErrorDateTime(true);
    } else {
      setIsErrorDateTime(false);

      formData.append("user_id", user_id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("dateStart", data.dateStart);
      formData.append("dateEnd", data.dateEnd);
      formData.append("target", data.target);
      formData.append("content", content);
      formData.append("status", data.status.value);
      const fileList = [...data.photos];
      for (let i = 0; i < fileList.length; i++) {
        formData.append("photos", fileList[i]);
      }
      console.log("formData-->", [...formData.entries()]);

      const addPost = async () => {
        await PostAPI.addPost(formData)
          .then((res) => {
            console.log("res-->", res);
            if (res.data.message === "add post successful") {
              alert("Add post successful!");
              reset();
              setRedirect(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      addPost();
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
              <h1>New Post</h1>

              <Form
                onSubmit={handleSubmit(handleSubmitForm)}
                encType="multipart/form-data"
              >
                <Label>Title</Label>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "Title is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput onChange={onChange} value={value} />
                  )}
                />
                {errors.title && (
                  <p style={{ color: "red" }}>{errors?.title.message}</p>
                )}
                <Label>Description</Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: "Description is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBTextArea onChange={onChange} rows={3} value={value} />
                  )}
                />
                {errors.description && (
                  <p style={{ color: "red" }}>{errors?.description.message}</p>
                )}
                <Label>Date Start</Label>
                <Controller
                  name="dateStart"
                  control={control}
                  rules={{
                    required: "Date Start is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput type="date" onChange={onChange} value={value} />
                  )}
                />
                {errors.dateStart && (
                  <p style={{ color: "red" }}>{errors?.dateStart.message}</p>
                )}
                <Label>Date End</Label>
                <Controller
                  name="dateEnd"
                  control={control}
                  rules={{
                    required: "Date End is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput type="date" onChange={onChange} value={value} />
                  )}
                />
                {errors.dateEnd && (
                  <p style={{ color: "red" }}>{errors?.dateEnd.message}</p>
                )}
                {isErrorDateTime && (
                  <p style={{ color: "red" }}>
                    Date End must be greater than or equal to Date Start!
                  </p>
                )}
                <Label>Target</Label>
                <Controller
                  name="target"
                  control={control}
                  rules={{
                    required: "Target is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput type="number" onChange={onChange} value={value} />
                  )}
                />
                {errors.target && (
                  <p style={{ color: "red" }}>{errors?.target.message}</p>
                )}
                <Label>Photos</Label>
                <MDBInput
                  type="file"
                  name="photos"
                  {...register("photos", {
                    required: "photos is required!",
                  })}
                  multiple
                  onChange={(e) => handleOnChangeFile(e.target.files)}
                />
                {/* <Controller
                  name="photos"
                  control={control}
                  rules={{
                    required: "Photos is required!",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      multiple
                      type="file"
                      onChange={(e) => onChange(e.target.files)}
                      value={value}
                    />
                  )}
                /> */}
                {errors.photos && (
                  <p style={{ color: "red" }}>{errors?.photos.message}</p>
                )}
                <Label>Content</Label>

                <CKEditor
                  name="content"
                  editor={ClassicEditor}
                  data={content}
                  onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "200px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                ></CKEditor>
                {errors.content && (
                  <p style={{ color: "red" }}>{errors?.content.message}</p>
                )}
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "happening", label: "happening" },
                        { value: "planning", label: "planning" },
                        // { value: "finished", label: "finished" },
                      ]}
                    />
                  )}
                />
                {errors.status && (
                  <p style={{ color: "red" }}>{errors?.status.message}</p>
                )}
                {redirect && <Navigate to="/posts" />}

                <MDBBtn
                  style={{ marginTop: "15px", width: "80px", height: "40px" }}
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

export default NewPost;
