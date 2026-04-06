
import { useState,useEffect } from "react";
import {Select, MenuItem,FormControl, Box, TextField, Button, Typography, Paper, Stepper, Step, StepLabel, } from "@mui/material";
import soceity from "../imgs/soceity.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

const Signup = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL
  const navigate = useNavigate();
  const steps = ["Account Info", "Security", "Verification"];
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("")
  const [cnfmPassword, setCnfmPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [yearOptions, setYearOptions] = useState([]);
  const [selectedyr, setSelectedYr] = useState(null);



  const fetchState = async () => {
    // setLoadingState(true);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${REACT_APP_URL}/finacialyrs/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("API Response:", result); // Debugging log


        const finacialyrsOptions = result.data.map((years) => ({
          value: years?._id || "",
          label: years?.label || "Unknown",
        }));

        setYearOptions(finacialyrsOptions);

      })
      .catch((error) => console.error("Error fetching states:", error))
    // .finally(() => setLoadingState(false));
  };
  useEffect(() => {
   fetchState()
  }, []);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // for  buttons 
  const getButtonText = () => {
    switch (activeStep) {
      case 0:
        return "Continue";
      case 1:
        return "Get OTP";
      case 2:
        return "Sign Up";
      // default:
      //   return "Continue";
    }
  };

  const handleAction = (e) => {
    if (activeStep === 0) {
      handleNext();
    }
    else if (activeStep === 1) {
      OTPGenerate(e);
    }
    else if (activeStep === 2) {
      SignUp(e);
    }
  };

  //genatrate OTP
  const OTPGenerate = (e) => {
    if (!email) {
      alert("Please Enter Email.");
      return;
    }
    if (!userName) {
      alert("Please Enter userName.");
      return;
    }

 if (!phoneNumber) {
      alert("Please Enter phoneNumber.");
      return;
    }

 if (!selectedyr) {
      alert("Please select finantial year.");
      return;
    }


    if (!password) {
      alert("Please Enter password.");
      return;
    }
    if (!cnfmPassword) {
      alert("Please confirm your password  ");
      return;
    }

    if (password != cnfmPassword) {
      alert("Password and Confirm Password must match.");
      return;
    }
    e.preventDefault();

    const data = {
      email: email,
    };

    axios
      .post(`${REACT_APP_URL}/otp/request-otp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Check your email ID for OTP");
        setActiveStep(2);
      })
      .catch((error) => {
        console.error(error);

        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
  };


  const SignUp = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Verify OTP
      const verifyResponse = await axios.post(
        `${REACT_APP_URL}/otp/verify-otp`,
        {
          email: email,
          otp: otp,
        }
      );

      console.log("Verify OTP Response:", verifyResponse.data);

      if (verifyResponse.data) {
        // 2️⃣ If OTP verified then signup
        const signupResponse = await axios.post(
          `${REACT_APP_URL}/users/signup`,
          {
            userName: userName,
            email: email,
            password: password,
            cpassword: cnfmPassword,
            financialYear: selectedyr,
            phoneNumber: phoneNumber
          }
        );

        toast.success("Signup Successful");
        console.log(signupResponse.data);
        navigate('/')
      }
    } catch (error) {
      console.error("Full error:", error);
      if (error.response) {
        // Server responded with an error status
        console.log("Error data:", error.response.data);
        console.log("Status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response
        console.log("No response received");
      } else {
        // Something else
        console.log("Error message:", error.message);
      }
      alert("OTP verification failed");
    }
  };


  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(${soceity})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />

        {/* Card */}
        <Paper
          elevation={10}
          sx={{
            position: "relative",
            width: 400,
            padding: 4,
            borderRadius: 4,
            backdropFilter: "blur(15px)",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Typography
            color="#e47303"
            variant="h5"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
            Create Account
          </Typography>

          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel
            sx={{
              mb: 3,
              "& .MuiStepIcon-root.Mui-active": {
                color: "#144145",
              },

              "& .MuiStepIcon-root.Mui-completed": {
                color: "#144145",
              },

              "& .MuiStepLabel-label.Mui-active": {
                color: "#144145",
                fontWeight: 600,
              },

              "& .MuiStepLabel-label.Mui-completed": {
                color: "#144145",
              },

              "& .MuiStepConnector-line": {
                borderColor: "#144145",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Box>
                <TextField
                  label="User Name"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="standard"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                    '& .MuiInputLabel-root': {
                      color: '#144145',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0f3336',
                    },
                  }}

                />
              </Box>

              <Box>
                <TextField
                  label="Email"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                    '& .MuiInputLabel-root': {
                      color: '#144145',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0f3336',
                    },
                  }}

                />
              </Box>

              <Box>
                <TextField
                  label="Phone Number"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="standard"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                    '& .MuiInputLabel-root': {
                      color: '#144145',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0f3336',
                    },
                  }}

                />
              </Box>

              <Box mt={1} >
                <Typography sx={{color:"#144145"}}>Financial Years</Typography>
                <FormControl fullWidth size="small" variant="standard"
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderColor: '#144145',
                    }, 
                  }}
                 >
                  <Select
                    value={selectedyr || ""}
                    onChange={(event) => setSelectedYr(event.target.value)}
                  >
                    {yearOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Box>
                <TextField
                  label="Password"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                    '& .MuiInputLabel-root': {
                      color: '#144145',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0f3336',
                    },
                  }}

                />
              </Box>


              <Box>
                <TextField
                  label="Confirm Password"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="standard"
                  value={cnfmPassword}
                  onChange={(e) => setCnfmPassword(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                    '& .MuiInputLabel-root': {
                      color: '#144145',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0f3336',
                    },
                  }}

                />
              </Box>

            </Box>
          )}

          {activeStep === 2 && (
            <>
              <Box mt={4} backroundcolor={'red'}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{ display: 'flex' }}
                  inputStyle={{
                    width: '2rem',
                    height: '2rem',
                    margin: '0 0.5rem',
                    fontSize: '1.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                />
              </Box>
            </>
          )}


          <Box mt={3} display="flex" justifyContent="space-between">
            {activeStep > 0 && (
              <Button sx={{ color: '#144145' }} onClick={handleBack}>Back</Button>
            )}

            <Button sx={{ background: '#144145' }} variant="contained" onClick={handleAction}>
              {getButtonText()}
            </Button>


          </Box>

          <Typography
            variant="body2"
            mt={2}
            textAlign="center"
            color="#e47303"
          >
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Signup;