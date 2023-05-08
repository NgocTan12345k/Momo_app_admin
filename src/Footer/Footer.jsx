import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  BsFacebook,
  BsTwitter,
  BsGoogle,
  BsInstagram,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";

const Footer = () => {
  return (
    <MDBFooter className="text-center text-lg-start text-light bg-info">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#/" className="me-4 text-reset">
            <BsFacebook />
          </a>
          <a href="#/" className="me-4 text-reset">
            <BsTwitter />
          </a>
          <a href="#/" className="me-4 text-reset">
            <BsGoogle />
          </a>
          <a href="#/" className="me-4 text-reset">
            <BsInstagram />
          </a>
          <a href="#/" className="me-4 text-reset">
            <BsLinkedin />
          </a>
          <a href="#/" className="me-4 text-reset">
            <BsGithub />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Công Ty Cổ Phần Dịch Vụ Di Động Trực Tuyến
              </h6>
              <p>
                Lầu 6, Toà nhà Phú Mỹ Hưng, số 8 Hoàng Văn Thái, khu phố 1,
                Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" />
                Địa chỉ: Tầng M, Tòa nhà Victory Tower, Số 12 Tân Trào, Phường
                Tân Phú, Quận 7, Thành phố Hồ Chí Minh
              </p>
              <p>
                <MDBIcon icon="envelope" />
                Email: hotro@momo.vn
              </p>
              <p>
                <MDBIcon icon="phone" /> Hotline: 1900 5454 41 (1000 đ/phút)
              </p>
              <p>
                <MDBIcon icon="print" /> Tổng đài gọi ra: 028.7306.5555 -
                028.9999.5555
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
