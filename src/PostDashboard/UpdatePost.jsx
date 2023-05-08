import Header from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import PostAPI from "../API/PostAPI";
import { useForm, Controller } from "react-hook-form";
import { MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { Label } from "reactstrap";
import { Navigate, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";

const UpdatePost = () => {
  const [postDetail, setPostDetail] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [isErrorDateTime, setIsErrorDateTime] = useState(false);
  const [content, setContent] = useState("");

  const { id } = useParams();

  const formData = new FormData();
  // const handleOnChangeFile = (fileList) => {
  //   for (let i = 0; i < fileList.length; i++) {
  //     const files = fileList[i];
  //     formData.append("photos", files);
  //   }
  //   // console.log("file-->", files[0]);
  //   // formData.append("photos", files[0]);
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    trigger,
  } = useForm({
    mode: "all",
  });
  const options = [
    { value: "happening", label: "happening" },
    { value: "planning", label: "planning" },
    { value: "finished", label: "finished" },
  ];

  useEffect(() => {
    const getPostDetail = async () => {
      const res = await PostAPI.getPostDetail(id);
      setPostDetail(res.data);
      // setValue("user_id", res.data.user_id);
      setValue("title", res.data.title);
      setValue("description", res.data.description);
      setValue(
        "dateStart",
        // res.data.dateStart
        dateFormat(res.data.dateStart, "yyyy-mm-dd")
      );
      setValue(
        "dateEnd",
        // res.data.dateEnd
        dateFormat(res.data.dateEnd, "yyyy-mm-dd")
      );
      setValue("target", res.data.target);

      setValue("status", {
        value: res.data.status,
        label: res.data.status,
      });
      setContent(res.data.content);
    };
    getPostDetail();
    register("content");
  }, [id, setValue, register]);

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

  const handleSubmitForm = async (data) => {
    console.log("ALLData", data);
    const start = new Date(data.dateStart).getTime();
    const end = new Date(data.dateEnd).getTime();

    if (start > end) {
      setIsErrorDateTime(true);
    } else {
      setIsErrorDateTime(false);
      // formData.append("user_id", data.user_id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("dateStart", data.dateStart);
      formData.append("dateEnd", data.dateEnd);
      formData.append("target", data.target);
      formData.append("content", content);
      formData.append("status", data.status.value);

      let result = window.confirm("Do you want to update this post?");
      if (result) {
        await PostAPI.updatePost(id, formData)
          .then((res) => {
            console.log(res);
            if (res.data.message === "update post successfully") {
              alert("Update post successfully!");
              setRedirect(true);
            } else {
              alert("Update post Unsuccessfully!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Update post Unsuccessfully!");
        setRedirect(true);
      }
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
              <h1>Update Post</h1>

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
                  render={({ field: { value, onChange } }) => (
                    <MDBInput
                      onChange={onChange}
                      value={value ?? postDetail.title}
                    />
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
                  render={({ field: { value, onChange } }) => (
                    <MDBTextArea
                      onChange={onChange}
                      value={value ?? postDetail.description}
                      rows={3}
                    />
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
                  render={({ field: { value, onChange } }) => (
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
                  render={({ field: { value, onChange } }) => (
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
                  render={({ field: { value, onChange } }) => (
                    <MDBInput
                      onChange={onChange}
                      value={value ?? postDetail.target}
                    />
                  )}
                />
                {errors.target && (
                  <p style={{ color: "red" }}>{errors?.target.message}</p>
                )}
                <Label>Photo</Label>
                <MDBInput
                  type="file"
                  name="photos"
                  // {...register("photo", {
                  //   required: "photo is required!",
                  // })}
                  // onChange={(e) => handleOnChangeFile(e.target.files)}
                  disabled
                />
                {/* {errors.photo && (
                  <p style={{ color: "red" }}>{errors?.photo.message}</p>
                )} */}
                <Label>Content</Label>
                <Controller
                  name="content"
                  control={control}
                  rules={{
                    required: "content is required!",
                  }}
                  render={({ field: { value } }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      onReady={(editor) => {
                        editor.editing.view.change((writer) => {
                          writer.setStyle(
                            "height",
                            "200px",
                            editor.editing.view.document.getRoot()
                          );
                        });
                      }}
                      data={content}
                      config={{
                        extraPlugins: [uploadPlugin],
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setValue("content", data);
                        setContent(data);
                        trigger("content");
                      }}
                    />
                  )}
                />
                {errors.content && (
                  <p style={{ color: "red" }}>{errors?.content.message}</p>
                )}
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        className="addl-class"
                        value={value}
                        onChange={(val) => {
                          onChange(val);
                        }}
                        defaultValue={{
                          value: postDetail.status,
                          label: postDetail.status,
                        }}
                        options={
                          options &&
                          options.map((item, index) => {
                            if (item.value !== postDetail.status) {
                              return {
                                key: index + 1,
                                value: item.value,
                                label: item.label,
                              };
                            }
                            return { value: null, label: null };
                          })
                        }
                      />
                    );
                  }}
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
export default UpdatePost;
