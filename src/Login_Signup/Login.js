import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import housingsociety from "../imgs/housingsociety.jpg"
import "./signup.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../imgs/img.jpg"

const LoginPage = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('')
  const [years, setYears] = useState([]);
  const [selectedYearId, setSelectedYearId] = useState('');


  useEffect(() => {
  const fetchDateRange = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/finacialyrs/`
      );

      setYears(response.data.data);
    } catch (error) {
      toast.error("Error fetching Years");
    }
  };

  fetchDateRange();
}, []);

  const LogIn = () => {
    setIsLoggedIn(true)
  }

const handleSelectChange = (event) => {
  setSelectedYearId(event.target.value);
};

//main
const handleOkClick = async () => {
  try {
    if (!email || !pass) {
      alert("Please enter email and password.");
      return;
    }

    if (!selectedYearId) {
      alert("Please select financial year");
      return;
    }

    const response = await axios.post(
      `${REACT_APP_URL}/users/login`,
      {
        email: email,
        password: pass,
        financialYear: selectedYearId,
      }
    );

    // Save token and user in cookies
    Cookies.set("token", response.data.token, { expires: 1 });
    Cookies.set("user", JSON.stringify(response.data.user));

    // ✅ Decode token to see what's inside
    const token = response.data.token;
    const base64Payload = token.split('.')[1]; 
    const payload = JSON.parse(atob(base64Payload)); 
    console.log("Cookies:", payload);

    toast.success("Login Successful");
    navigate('/dashboard');

  } catch (error) {
    console.log("Full Error:", error);
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <Box
      className="signup-container"
      sx={{
        backgroundImage: `url(${housingsociety})`,
      }}
    >
      <Box className="signup-card">
        {/* LEFT SIDE */}
        <Box className="signup-left">
          <Box>
            {!isLoggedIn ? (
              <>
                <Typography variant="h5" fontWeight="600" mb={3}>
                  Login
                </Typography>

                <Box>
                  <TextField
                    label="Email Address"
                    fullWidth
                    size="small"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    size="small"
                    margin="normal"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={LogIn}
                    sx={{
                      mt: 2,
                      backgroundColor: "#3b5d3b",
                      "&:hover": { backgroundColor: "#2f4a2f" },
                    }}

                  >
                    Continue
                  </Button>

                  <Typography variant="body2" textAlign="center" mt={2}>
                    Don’t have an account?{" "}
                    <span style={{cursor:"pointer",fontWeight:"bold"}} onClick={() => navigate("/signup")} className="signin-link" >Sign up</span>
                  </Typography>
                </Box>
              </>
            ) : (
              <Box>
                <Typography variant="h5" fontWeight="600" mb={3}>
                  Select Date Range
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  value={selectedYearId}
                  onChange={handleSelectChange}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: "30px",
                      background: "linear-gradient(90deg, rgba(173,216,230,0.5), rgba(216,191,216,0.5))",

                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      paddingLeft: 2,
                      color: "#000",
                      "& .MuiSelect-select": {
                        paddingY: "12px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#666",
                    },
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year._id} value={year._id}>
                      {year.label}
                    </MenuItem>
                  ))}
                </TextField>



                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#3b5d3b",
                    "&:hover": { backgroundColor: "#2f4a2f" },
                  }}
                  onClick={handleOkClick}
                >
                  LogIn
                </Button>
              </Box>
            )}
          </Box>

        </Box>

        {/* RIGHT SIDE IMAGE */}
        <Box
          className="signup-right"
          sx={{
            backgroundImage: `url(${housingsociety})`,
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;


// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
// } from "@mui/material";
// import "./signup.css";
// import housingsociety from "../imgs/housingsociety.jpg"

// const Login = () => {
//   return (
//     <Box
//       className="signup-container"
//       sx={{
//         backgroundImage: `url(${housingsociety})`,
//       }}
//     >
//       <Box className="signup-card">
//         {/* LEFT SIDE FORM */}
//         <Box className="signup-left">
//           <Typography variant="h5" fontWeight="600" mb={3}>
//             Sign Up
//           </Typography>

//           <TextField
//             label="Name"
//             fullWidth
//             size="small"
//             margin="normal"
//           />

//           <TextField
//             label="Email Address"
//             fullWidth
//             size="small"
//             margin="normal"
//           />

//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             size="small"
//             margin="normal"
//           />

//           <Button
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 2,
//               backgroundColor: "#3b5d3b",
//               "&:hover": { backgroundColor: "#2f4a2f" },
//             }}
//           >
//             Signup
//           </Button>

//           <Typography
//             variant="body2"
//             textAlign="center"
//             mt={2}
//           >
//             Have an account? <span className="signin-link">Sign in</span>
//           </Typography>
//         </Box>

//         {/* RIGHT SIDE IMAGE */}
//         <Box
//           className="signup-right"
//           sx={{
//             backgroundImage: `url(${housingsociety})`,
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Login;