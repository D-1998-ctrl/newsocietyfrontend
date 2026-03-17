import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Button,
    Typography,
    TextField,
    Divider,
    Autocomplete,
    Drawer,
    IconButton,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { toast } from "react-toastify";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const Organization = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
        setIsEditing(false);
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

    const [societyData, setSocietyData] = useState(null);
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
    const [soceityId, setSoceityId] = useState('')

    //fetch Society
    const fetchSociety = async () => {
        try {
            const response = await fetch(`${REACT_APP_URL}/Organisation/`);
            if (!response.ok) {
                throw new Error("Failed to fetch organization data");
            }
            const data = await response.json();
            console.log(data);
            setSocietyData(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    //create and update soceity
    const handleSubmit = async () => {

        try {
            const url = isEditing
                ? `${REACT_APP_URL}/Organisation/${soceityId}`
                : `${REACT_APP_URL}/Organisation`;
            console.log('url', url)
            const method = isEditing ? "PATCH" : "POST";

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

            toast.success(
                isEditing
                    ? "Society updated successfully"
                    : "Society created successfully"
            );

            fetchSociety()
            handleDrawerClose();

            // resetForm()
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
        }
    };

    const handleEdit = async () => {
        setSoceityId(societyData[0]._id)
        setSocietyName(societyData[0].SocietyName)
        setAddress1(societyData[0].AddressLine1)
        setAddress2(societyData[0].AddressLine2)
        setSelectedState(societyData[0].State)
        setPincode(societyData[0].Pin)
        setMobileNum(societyData[0].Mobile)
        setEmail(societyData[0].Email)
        setRegistrationNo(societyData[0].Registration)
        setRegistrationDate(societyData[0].RegisteredDate)
        setRegistrationAuthority(societyData[0].RegisteringAuthority)
        setAddregistrationAuthority(societyData[0].AddressofRegisteringAuthority)
        setIsEditing(true);
        setIsDrawerOpen(true);
    };

    //delete soceity
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDelete = () => {
        const url = `${REACT_APP_URL}/Organisation/${soceityId}`;

        fetch(url, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => {
                //console.log('data',data)
                toast.success(`${societyName} deleted successfully!`);
                fetchSociety();
                handleDrawerClose();
                // resetForm();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to delete template");
            });
    };
    const handleConfirmDelete = () => {
        handleDelete();
        setOpenDeleteDialog(false);
    };

    useEffect(() => {
        fetchSociety()
        fetchStates()
    }, []);

    return (
        <Box>

            <Box>
                {!societyData || societyData.length === 0 ? (
                    <Button
                        variant="contained"
                        sx={{ background: "#1b575c", color: "#fff", ml: 2 }}
                        onClick={handleDrawerOpen}
                    >
                        Create New Society
                    </Button>
                ) : (
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} minHeight={600} mt={2}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                m: 2,
                                borderRadius: 2,
                                position: "relative",
                                background: "#f9f9f9",
                                width: 800,
                            }}
                        >

                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography m={2} color="var(--secondary-color)" fontWeight="bold" variant="h6"   >
                                        Society Information

                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={handleEdit}

                                >
                                    <BorderColorIcon sx={{ color: "var(--secondary-color)" }} />
                                </IconButton>

                            </Box>


                            <Divider />
                            <Box>
                                <Box mt={1}>
                                    <Typography variant="body" color="var(--primary-color)"><b> {societyData[0].SocietyName} </b></Typography>
                                </Box>

                                <Box mt={2}>
                                    <Box>
                                        <Typography variant="body" color="var(--primary-color)"><b>Address  </b> : </Typography>
                                        <Box>
                                            <Typography color="var(--complementary-color)"><b>{societyData[0].AddressLine1} {societyData[0].AddressLine2}, {societyData[0].State}</b></Typography>
                                        </Box>
                                    </Box>
                                </Box>




                                <Box display={'flex'} alignItems="flex-start" justifyContent={'space-between'} gap={4} mt={2}>
                                    <Box display={'flex'} alignItems="flex-start" justifyContent={'space-between'}>
                                        <Typography variant="body" color="var(--primary-color)"><b>Pin Code </b> :  </Typography>
                                        <Box> <Typography color="var(--complementary-color)"><b> {societyData[0].Pin} </b></Typography></Box>
                                    </Box>

                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Typography variant="body" color="var(--primary-color)"><b>Mobile No</b> : </Typography>
                                        <Box><Typography color="var(--complementary-color)" variant="body"><b>{societyData[0].Mobile}</b></Typography></Box>
                                    </Box>
                                </Box>


                                <Box display={'flex'} alignItems="flex-start" justifyContent={'space-between'} gap={4} mt={2}>
                                    <Box display={'flex'} alignItems="flex-start" justifyContent={'space-between'}>
                                        <Typography variant="body" color="var(--primary-color)"><b>Email </b> :  </Typography>
                                        <Box> <Typography color="var(--complementary-color)"><b> {societyData[0].Email} </b></Typography></Box>
                                    </Box>

                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Typography variant="body" color="var(--primary-color)"><b>Registration No</b> : </Typography>
                                        <Box><Typography color="var(--complementary-color)" variant="body"><b>{societyData[0].Registration}</b></Typography></Box>
                                    </Box>
                                </Box>

                                <Box display={'flex'} alignItems="flex-start" justifyContent={'space-between'} gap={4} mt={2}>
                                    <Box display={'flex'} alignItems="flex-start" justifyContent={'space-between'}>
                                        <Typography variant="body" color="var(--primary-color)"><b>Registered Date </b> :  </Typography>
                                        <Box> <Typography color="var(--complementary-color)"><b> {new Date(societyData[0].RegisteredDate).toLocaleDateString("en-GB")} </b></Typography></Box>


                                    </Box>

                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Typography variant="body" color="var(--primary-color)"><b>Registering Authority</b> : </Typography>
                                        <Box><Typography color="var(--complementary-color)"  variant="body"><b>{societyData[0].RegisteringAuthority}</b></Typography></Box>
                                    </Box>
                                </Box>


                                <Box mt={2}  >

                                    <Typography variant="body" color="var(--primary-color)"><b>Address of Registering Authority: </b> </Typography>
                                    <Box> <Typography color="var(--complementary-color)"><b> {societyData[0].AddressofRegisteringAuthority} </b></Typography>
                                    </Box>

                                </Box>



                            </Box>



                        </Paper>
                    </Box>
                )}
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
                            {isEditing ? "Update Society" : "Create Society"}
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

                    <Dialog
                        open={openDeleteDialog}
                        onClose={() => setOpenDeleteDialog(false)}
                    >
                        <DialogTitle><b>Confirm Delete </b></DialogTitle>

                        <DialogContent>
                            Are you sure you want to delete <b> {societyName}</b> this ?
                        </DialogContent>

                        <DialogActions>
                            <Button
                                sx={{ background: '#185259', color: '#ffffff' }}
                                onClick={() => setOpenDeleteDialog(false)}
                                variant="contained"
                            >
                                No
                            </Button>

                            <Button sx={{ borderColor: '#185259' }}

                                variant="outlined"
                                onClick={handleConfirmDelete}
                            >
                                <DeleteIcon color="error" />
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
                        <Box>
                            <Button
                                sx={{ background: '#10370d', color: '#ffffff' }}
                                onClick={handleSubmit}
                                variant="contained"
                            >
                                {isEditing ? "Update" : "Save"}
                            </Button>
                        </Box>

                        <Box>
                            <Button
                                sx={{ borderColor: '#1b575c', color: '#1b575c' }}
                                onClick={handleDrawerClose}
                                variant='outlined'><b>Cancel</b>
                            </Button>
                        </Box>

                        <Box>
                            {isEditing && (
                                <Button color="error" variant="contained"
                                    onClick={() => setOpenDeleteDialog(true)}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Drawer >

        </Box>
    );
};

export default Organization;