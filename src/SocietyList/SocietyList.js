

import { useState, useEffect, useMemo, useCallback } from "react";
import {
    Box,

    Button,
    Typography,
    TextField,
    Divider,
    Autocomplete,
    Drawer,

} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';

const SocietyList = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL;
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);

    };

    const handleDrawerClose = () => {
        // setMemberId('')
        setIsDrawerOpen(false);
        // resetForm()
    };

    //fetch states
    const fetchStates = () => {
        fetch("https://countriesnow.space/api/v0.1/countries/states")
            .then(res => res.json())
            .then(data => {
                const india = data.data.find(
                    (country) => country.name === "India"
                );

                const formattedStates = india.states.map((state) => ({
                    label: state.name,
                    value: state.name,
                }));

                setState(formattedStates);
            });
    }
    const [allSocietiesData, setAllSocietiesData] = useState([]);
    const [societyName, setSocietyName] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [state, setState] = useState([])
    const [selectedState, setSelectedState] = useState(null);
    const [pincode, setPincode] = useState('')
    const [mobileNum, setMobileNum] = useState('')
    const [email, setEmail] = useState('')
    const [registrationNo, setRegistrationNo] = useState('')
    const [registrationDate, setRegistrationDate] = useState(null)
    const [registrationAuthority, setRegistrationAuthority] = useState('')
    const [AddregistrationAuthority, setAddregistrationAuthority] = useState('')

    //fetch Society
    const fetchSociety = useCallback(async () => {
        try {
            const response = await fetch(`${REACT_APP_URL}/Organisation/`);
            if (!response.ok) {
                throw new Error("Failed to fetch organization data");
            }
            const data = await response.json();
            setAllSocietiesData(data);
        } catch (err) {
            console.error(err.message);
        }
    }, [REACT_APP_URL]);

    //create soceity
    const handleSubmit = async () => {

        try {
            const url = `${REACT_APP_URL}/Organisation/`;
             console.log('url', url)
            const method = "POST";

            const formattedRegisteredDate = moment(registrationDate).format("YYYY-MM-DD");

            const SocietyData = {
                SocietyName: societyName,
                AddressLine1: address1,
                AddressLine2: address2,
                State: selectedState,
                Pin: pincode,
                Mobile: mobileNum,
                Email: email,
                Registration: registrationNo,
                RegisteredDate: formattedRegisteredDate,
                RegisteringAuthority: registrationAuthority,
                AddressofRegisteringAuthority: AddregistrationAuthority,
            };

            const SocietyResponse = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(SocietyData)
            });

            const societyResult = await SocietyResponse.json();
             console.log("Society saved:", societyResult);
            if (!SocietyResponse.ok) {
                throw new Error(societyResult.message || "Society save failed");
            }

            if (societyResult._id) {
                Cookies.set("societyId", societyResult._id);
            }

            toast.success(

                "Society created successfully"
            );

            fetchSociety()
            handleDrawerClose();

            // resetForm()
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
        }
    };
    useEffect(() => {
        fetchSociety()
        fetchStates()
    }, [fetchSociety]);


    //
    const columns = useMemo(() => {
        return [
            {
                accessorKey: 'srNo',
                header: 'Sr No',
                size: 100,
                Cell: ({ row }) => row.index + 1,
            },


            {
                accessorKey: 'date',
                header: 'Date',
                size: 150,
                Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
            },

            {
                accessorKey: 'SocietyName',
                header: 'Society Name',
                size: 150,

            },


            {
                accessorKey: 'AddressLine1',
                header: 'AddressLine1',
                size: 150,
            },

            {
                accessorKey: 'AddressLine2',
                header: 'AddressLine2',
                size: 150,

            },

            {
                accessorKey: 'State',
                header: 'State',
                size: 150,
            },

            {
                accessorKey: 'Pin',
                header: 'Pin',
                size: 150,
            },
            {
                accessorKey: 'Mobile',
                header: 'Mobile No',
                size: 150,
            },

            {
                accessorKey: 'Email',
                header: 'Email',
                size: 150,
            },
            {
                accessorKey: 'Registration',
                header: 'Registration',
                size: 150,
            },
            {
                accessorKey: 'RegisteredDate',
                header: 'RegisteredDate',
                Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
                size: 150,
            },

        ];
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: allSocietiesData,
        enablePagination: true,

       
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                const societyId = row.original._id  // ← extract _id properly

                if (!societyId) {
                    toast.error("Society ID not found");
                    return;
                }

                Cookies.set("societyId", societyId);
                navigate("/app");
            },
            sx: { cursor: "pointer" },
        }),
        muiTableHeadCellProps: {
            style: {
                backgroundColor: "#ecfbfd",
                color: "black",
                fontSize: "16px",
            },
        },
    });

  
    return (
        <Box>
            <Box textAlign={'center'} mt={3}>
                <Typography
                    sx={{ color: 'var(--primary-color)' }}
                    variant="h4"
                >
                    <b>List Of Society</b>
                </Typography>
            </Box>
            <Box mt={4}>
                <Box>
                    <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2, fontWeight: 'bold' }} onClick={handleDrawerOpen}>Create Society</Button>
                </Box>

                <Box mt={4} m={2} >
                    <MaterialReactTable
                        table={table}

                        muiTableHeadCellProps={{
                            sx: { color: 'var(--primary-color)', },
                        }}
                    />
                </Box>
            </Box>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
                        width: isSmallScreen ? "100%" : "60%",
                        zIndex: 1000,
                    },
                }}
            >

                <Box>

                    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfbfd' }}>
                        <Typography m={2} fontWeight="bold" variant="h6">
                            Create Society
                        </Typography>
                        <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
                    </Box>
                    <Divider />


                    <Box m={2}>
                        <Box mt={1}>
                            <Typography>
                                Society Name
                            </Typography>

                            <TextField
                                fullWidth
                                variant="standard"
                                size="small"
                                value={societyName}
                                onChange={(e) => setSocietyName(e.target.value)}
                                sx={{
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#144145',
                                        borderBottomWidth: 1.5,
                                    },
                                }}
                                focused
                            />
                        </Box>

                        <Box display={'flex'} alignItems={'center'} gap={5} mt={2}>
                            <Box flex={1}>
                                <Typography>
                                    Address Line 1
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="standard"
                                    size="small"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    sx={{
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#144145',
                                            borderBottomWidth: 1.5,
                                        },
                                    }}
                                    focused
                                />
                            </Box>


                            <Box flex={1}>
                                <Typography>
                                    Address Line 2
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="standard"
                                    size="small"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    sx={{
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#144145',
                                            borderBottomWidth: 1.5,
                                        },
                                    }}
                                    focused
                                />
                            </Box>
                        </Box>

                        <Box mt={2}>
                            <Typography>State</Typography>
                            <Autocomplete
                                options={state}
                                value={state.find((option) => option.value === selectedState) || null}
                                onChange={(event, newValue) => {
                                    setSelectedState(newValue?.value || "");
                                }}

                                getOptionLabel={(option) => option.label || ""}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        sx={{
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: '#144145',
                                                borderBottomWidth: 1.5,
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>


                        <Box display={'flex'} alignItems={'center'} gap={5} mt={2}>
                            <Box flex={1}>
                                <Typography>
                                    Pin Code
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="standard"
                                    size="small"
                                    type="number"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    sx={{
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#144145',
                                            borderBottomWidth: 1.5,
                                        },
                                    }}
                                    focused
                                />
                            </Box>


                            <Box flex={1}>
                                <Typography>
                                    Mobile No
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="standard"
                                    size="small"
                                    type="number"
                                    value={mobileNum}
                                    onChange={(e) => setMobileNum(e.target.value)}
                                    sx={{
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#144145',
                                            borderBottomWidth: 1.5,
                                        },
                                    }}
                                    focused
                                />
                            </Box>
                        </Box>

                        <Box display={'flex'} alignItems={'center'} gap={5} mt={2}>
                            <Box flex={1}>
                                <Typography>
                                    Email
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="standard"
                                    size="small"

                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#144145',
                                            borderBottomWidth: 1.5,
                                        },
                                    }}
                                    focused
                                />
                            </Box>


                            <Box flex={1}>
                                <Typography>
                                    Registration Number
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="standard"
                                    size="small"

                                    value={registrationNo}
                                    onChange={(e) => setRegistrationNo(e.target.value)}
                                    sx={{
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#144145',
                                            borderBottomWidth: 1.5,
                                        },
                                    }}
                                    focused
                                />
                            </Box>
                        </Box>


                        <Box display={'flex'} alignItems={'center'} gap={5} mt={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Box flex={1}>
                                    <Typography>
                                        Registration Date
                                    </Typography>

                                    <DatePicker
                                        value={registrationDate ? new Date(registrationDate) : null}
                                        format="dd-MM-yyyy"
                                        onChange={(newValue) => setRegistrationDate(newValue)}
                                        slotProps={{
                                            textField: { size: "small", fullWidth: true, },
                                        }}
                                    />
                                </Box>


                                <Box flex={1}>
                                    <Typography>
                                        Registration Authority
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        size="small"

                                        value={registrationAuthority}
                                        onChange={(e) => setRegistrationAuthority(e.target.value)}
                                        sx={{
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: '#144145',
                                                borderBottomWidth: 1.5,
                                            },
                                        }}
                                        focused
                                    />
                                </Box>
                            </LocalizationProvider>
                        </Box>

                        <Box mt={2}>
                            <Typography>
                                Address of Registration Authority
                            </Typography>

                            <TextField
                                fullWidth
                                variant="standard"
                                size="small"

                                value={AddregistrationAuthority}
                                onChange={(e) => setAddregistrationAuthority(e.target.value)}
                                sx={{
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#144145',
                                        borderBottomWidth: 1.5,
                                    },
                                }}
                                focused
                            />
                        </Box>

                    </Box>



                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
                        <Box>
                            <Button
                                sx={{ background: '#10370d', color: '#ffffff' }}
                                onClick={handleSubmit}
                                variant="contained"
                            >
                                Save
                            </Button>
                        </Box>

                        <Box>
                            <Button
                                sx={{ borderColor: '#1b575c', color: '#1b575c' }}
                                onClick={handleDrawerClose}
                                variant='outlined'><b>Cancel</b>
                            </Button>
                        </Box>


                    </Box>
                </Box>
            </Drawer >

        </Box>
    );
};

export default SocietyList;
