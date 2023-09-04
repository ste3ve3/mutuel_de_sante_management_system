/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import AuthApi from "../../../api/auth";

import { useAuth } from "auth-context/auth.context";

function SignIn() {
  const navigate = useNavigate();

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRedirect = () => navigate("/dashboard");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email !== "mutuelmanagementsystem@gmail.com" && formData.password !== "Sonia@1234") {
      setError("Invalid login credential!")
      return
    }
    localStorage.setItem("loggedInUser", JSON.stringify(formData));
    handleRedirect()
  };


  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      {user && user.token ? (
        <Card>
          <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={handleRedirect}>
              {`Let's go`}
            </SoftButton>
          </SoftBox>
        </Card>
      ) : (
        <Card>
          <SoftBox p={3} textAlign="center">
            <SoftTypography variant="h3" fontWeight="bold" textGradient>
              Login
            </SoftTypography>
            <SoftTypography variant="body2" fontWeight="regular" color="text" mt={1}>
              Enter your admin credentials to continue
            </SoftTypography>
          </SoftBox>
            <SoftBox component="form" role="form"  px={4}>
              <SoftBox mb={2} mt={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="email" name="email" value={formData?.email} onChange={handleFormData} placeholder="Email" />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Password
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  placeholder="Password"
                  value={formData?.password}
                />
              </SoftBox> 
            </SoftBox>
            <SoftBox  pb={3} px={4}>
              <SoftBox mt={2} mb={2} textAlign="center">
                <h6
                  style={{
                    fontSize: ".8em",
                    color: "red",
                    textAlign: "center",
                    fontWeight: 400,
                    transition: ".2s all",
                  }}
                >
                  {error}
                </h6>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                  sign in
                </SoftButton>
              </SoftBox>
              </SoftBox>
        </Card>
      )}
    </BasicLayout>
  );
}

export default SignIn;
